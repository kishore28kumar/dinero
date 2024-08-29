import { HttpsError, onCall } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { initializeApp } from "firebase-admin/app";
import { getAuth, UserRecord } from "firebase-admin/auth";
import { AuthData } from "firebase-functions/lib/common/providers/https";
import { createCipheriv, createDecipheriv, generateKeyPairSync, privateDecrypt, publicEncrypt, randomBytes, RsaPublicKey } from "crypto";
import { RSA_PKCS1_OAEP_PADDING } from "constants";

initializeApp();
const auth = getAuth();
const customClaims = { approved: true, role: "user" };

function validateAuth(auth: AuthData | undefined) {

    // Checking that the user is authenticated.
    if (!auth) {
        // Throwing an HttpsError so that the client gets the error details.
        throw new HttpsError("failed-precondition", "The function must be " +
            "called while authenticated.");
    }

    if (auth!.token.role !== "admin") {
        throw new HttpsError("failed-precondition", "Only admin is allowed to perform this action.");
    }
}

exports.approveUser = onCall({ cors: ["https://dinero-62808.web.app/"] }, async (request) => {

    validateAuth(request.auth);

    // Message text passed from the client.
    const newUserUid = request.data.uid;
    // Checking attribute.
    if (!(typeof newUserUid === "string") || newUserUid.length === 0) {
        // Throwing an HttpsError so that the client gets the error details.
        throw new HttpsError("invalid-argument", "The function must be called " +
            "with one arguments \"uid\" containing the new user's UID.");
    }

    logger.info(`Admin approval for new user: ${newUserUid}`);

    // Get User record
    let userRecord = await auth.getUser(newUserUid);
    logger.log(`Successfully fetched user data: ${userRecord.uid}`);

    if (!userRecord.customClaims!.approved) {
        // Set Custom Claims
        await auth.setCustomUserClaims(userRecord.uid, customClaims);
        return {
            "message": `Approved ${userRecord.displayName}!`
        }
    } else {
        logger.log(`User ${userRecord.displayName} is already approved.`);
        return {
            "message": "User is already approved."
        }
    }
});

exports.getAllUsers = onCall(async (request) => {

    // Validate Auth
    validateAuth(request.auth);

    const nextPageToken = request.data.nextPageToken;
    let listUsersResult;
    if (nextPageToken != undefined && nextPageToken != null) {
        listUsersResult = await getAuth().listUsers(10, nextPageToken);
    } else {
        listUsersResult = await getAuth().listUsers(10);
    }

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
    return {
        "data": users,
        "nextPageToken": listUsersResult.pageToken
    }
});

function encrypt(data: string, publicKey: string) {
    const encryptedData = publicEncrypt(
        {
            key: publicKey,
            padding: RSA_PKCS1_OAEP_PADDING,
            oaepHash: 'sha256',
        },
        Buffer.from(data)
    );
    return encryptedData.toString('base64');
}

function decrypt(encryptedData: string, privateKey: string) {
    const buffer = Buffer.from(encryptedData, 'base64');
    const decryptedData = privateDecrypt(
        {
            key: privateKey,
            padding: RSA_PKCS1_OAEP_PADDING,
            oaepHash: 'sha256',
        },
        buffer
    );
    return decryptedData.toString();
}

function generateRandomBytes(length) {
    return randomBytes(length);
}

function encryptAES(text, key, iv) {
    const cipher = createCipheriv('aes-256-cbc', key, iv);
    let encryptedData = cipher.update(text, 'utf8', 'base64');
    encryptedData += cipher.final('base64');
    return encryptedData;
}

function decryptAES(encryptedData, key, iv) {
    const decipher = createDecipheriv('aes-256-cbc', key, iv);
    let decryptedData = decipher.update(encryptedData,
        'base64', 'utf8');
    decryptedData += decipher.final('utf8');
    return decryptedData;
}

exports.test = onCall(async (request) => {
    const { privateKey, publicKey } = generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem'
        }
    });

    logger.info(`publicKey: ${publicKey}`);
    logger.info(`privateKey: ${privateKey}`);

    // Example usage
    const data = '1000';

    const encrypted = encrypt(data, publicKey);
    console.log('Encrypted data:', encrypted);

    const decrypted = decrypt(encrypted, privateKey);
    console.log('Decrypted data:', decrypted);

    // Example usage:
    const key = generateRandomBytes(32); // 256-bit key
    const iv = generateRandomBytes(16); // 128-bit IV
    const text = '1,00,00,000';
    console.log('Encrypted:', encryptAES(text, key, iv));
    console.log('Decrypted:', decryptAES(encryptAES(text, key, iv), key, iv));
});
