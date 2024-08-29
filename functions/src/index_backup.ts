/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { initializeApp } from "firebase-admin/app";
import { FirebaseAuthError, UserRecord, getAuth } from "firebase-admin/auth";
import express, { Application, NextFunction, Request, Response } from "express";

const app: Application = express();
initializeApp();
const auth = getAuth();

const RequireAdmin = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const idToken: string = request.headers.authorization?.split('Bearer ')[1] as string;
        const decodedToken = await auth.verifyIdToken(idToken, true);
        if (decodedToken.role === 'admin') {
            logger.log('Admin request allowed.');
            response.locals.decodedToken = decodedToken;
            next();
        } else {
            logger.error('Admin request denied.');
            response.status(401).send({
                "message": "Unauthorized!"
            });
        }
    } catch (error) {
        logger.error(`Error: ${error}`);
        response.status(401).send({
            "message": "Unauthorized!"
        });
    }
}
app.use(RequireAdmin);

const customClaims = { approved: true, role: "user" };

app.get('/approve', async (request: Request, response: Response) => {

    // Get UID from query params
    const uid: string = request.query["uid"] as string;
    logger.info(`Admin approval for new user: ${uid}`);

    const decodedToken = response.locals.decodedToken;
    if (decodedToken.uid = uid) {
        response.status(400).send({
            "message": "User can't approve himself."
        });
        return;
    }

    // Get User record
    auth
        .getUser(uid)
        .then((userRecord) => {
            logger.log(`Successfully fetched user data: ${userRecord.uid}`);

            if (!userRecord.customClaims!.approved) {
                // Set Custom Claims
                auth.setCustomUserClaims(uid, customClaims).then(() => response.send({
                    "message": `Approved ${userRecord.displayName}!`
                }));
            } else {
                response.status(400).send({
                    "message": "User is already approved."
                });
            }
        })
        .catch((error: FirebaseAuthError) => {
            logger.error(`Error fetching user data: ${error}`);
            response.status(400).send({
                "message": "Error fetching user data."
            });
        });
});

app.get('/', async (request: Request, response: Response) => {

    // Get Next Page Token
    const nextPageToken: string = request.query["nextPageToken"] as string;

    getAuth()
        .listUsers(10, nextPageToken)
        .then((listUsersResult) => {
            let users: any[] = [];
            listUsersResult.users.forEach((userRecord: UserRecord) => {
                users.push({
                    "uid": userRecord.uid,
                    "email": userRecord.email,
                    "emailVerified": userRecord.emailVerified,
                    "displayName": userRecord.displayName,
                    "disabled": userRecord.disabled,
                    "role": userRecord.customClaims!.role,
                    "approved": userRecord.customClaims!.approved ? userRecord.customClaims!.approved : false
                });
            });
            response.status(200).send({
                "data": users,
                "nextPageToken": listUsersResult.pageToken
            });
        })
        .catch((error) => {
            logger.log('Error listing users:', error);
            response.status(400).send({
                "message": "Error listing users."
            });
        });
});

export const user = onRequest(app);
// https://github.com/firebase/functions-samples/blob/main/Node-1st-gen/authorized-https-endpoint/functions/index.js