import { useFirebaseApp } from "reactfire";
import {
  getAuth,
  GoogleAuthProvider,
  EmailAuthProvider,
  browserSessionPersistence,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import StyledFirebaseAuth from "../components/StyledFirebaseAuth";
import { IndianRupee } from "lucide-react";

export function SignIn() {
  let navigate = useNavigate();

  const authInstance = getAuth(useFirebaseApp());
  authInstance.setPersistence(browserSessionPersistence);

  // Configure FirebaseUI.
  const uiConfig: firebaseui.auth.Config = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    // signInSuccessUrl: "/dashboard",
    callbacks: {
      signInSuccessWithAuthResult: function (authResult: any) {
        navigate("/user-home/dashboard");
        return false;
      },
    },
    // We will display Google and Email as auth providers.
    signInOptions: [
      // EmailAuthProvider.PROVIDER_ID,
      GoogleAuthProvider.PROVIDER_ID,
    ],
  };

  return (
    <>
      <main className="grid min-h-screen place-items-center bg-black items-start pt-72">
        <div className="text-center min-w-full">
          <div className="flex flex-row grow justify-center items-baseline pb-4">
            <IndianRupee className="h-11 w-11" />
            <h1 className="text-6xl font-bold text-white">Dinero</h1>
          </div>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={authInstance} />
        </div>
      </main>
    </>
  );
}
