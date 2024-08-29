import { Outlet } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "./components/ThemeProvider";
import {
  AuthProvider,
  FirestoreProvider,
  FunctionsProvider,
  StorageProvider,
  useFirebaseApp,
} from "reactfire";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import {
  CACHE_SIZE_UNLIMITED,
  connectFirestoreEmulator,
  Firestore,
  initializeFirestore,
  persistentLocalCache,
  persistentSingleTabManager,
} from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage";
import AppRoutes from "./AppRoutes";
import { FirebaseApp } from "firebase/app";
import { WithAppCheckProvider } from "@/components/hoc/WithAppCheckProvider";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";

function App() {
  const app: FirebaseApp = useFirebaseApp();
  const firestoreInstance: Firestore = initializeFirestore(app, {
    localCache: persistentLocalCache({
      tabManager: persistentSingleTabManager({ forceOwnership: true }),
      cacheSizeBytes: CACHE_SIZE_UNLIMITED,
    }),
  });
  const storageInstance = getStorage(app);
  const authInstance = getAuth(app);
  const functionsInstance = getFunctions(app);

  // Set up emulators
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    connectStorageEmulator(storageInstance, "localhost", 9002);
    connectAuthEmulator(authInstance, "http://127.0.0.1:9001/", {
      disableWarnings: true,
    });
    connectFirestoreEmulator(firestoreInstance, "localhost", 9003);
    connectFunctionsEmulator(functionsInstance, "localhost", 5001);
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <FunctionsProvider sdk={functionsInstance}>
        <WithAppCheckProvider app={app}>
          <FirestoreProvider sdk={firestoreInstance}>
            <StorageProvider sdk={storageInstance}>
              <AuthProvider sdk={authInstance}>
                <Outlet />
                <AppRoutes />
              </AuthProvider>
            </StorageProvider>
          </FirestoreProvider>
        </WithAppCheckProvider>
      </FunctionsProvider>
    </ThemeProvider>
  );
}

export default App;
