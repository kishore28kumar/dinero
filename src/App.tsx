import { Outlet } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "./components/ThemeProvider";
import {
  AppCheckProvider,
  AuthProvider,
  FirestoreProvider,
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
import {
  AppCheck,
  ReCaptchaV3Provider,
  initializeAppCheck,
} from "firebase/app-check";
import AppRoutes from "./AppRoutes";

function App() {
  const app = useFirebaseApp();
  const appCheckInstance: AppCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(
      "6LdxSyQqAAAAAH-8Rwe7fILh7IYxDdiu5CfAotZF"
    ),
    isTokenAutoRefreshEnabled: true,
  });
  const firestoreInstance: Firestore = initializeFirestore(app, {
    localCache: persistentLocalCache({
      tabManager: persistentSingleTabManager({ forceOwnership: true }),
      cacheSizeBytes: CACHE_SIZE_UNLIMITED,
    }),
  });
  const storageInstance = getStorage(app);
  const authInstance = getAuth(app);

  // Set up emulators
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    connectStorageEmulator(storageInstance, "localhost", 9002);
    connectAuthEmulator(authInstance, "http://127.0.0.1:9001/", {
      disableWarnings: true,
    });
    connectFirestoreEmulator(firestoreInstance, "localhost", 9003);
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AppCheckProvider sdk={appCheckInstance}>
        <FirestoreProvider sdk={firestoreInstance}>
          <StorageProvider sdk={storageInstance}>
            <AuthProvider sdk={authInstance}>
              <Outlet />
              <AppRoutes />
            </AuthProvider>
          </StorageProvider>
        </FirestoreProvider>
      </AppCheckProvider>
    </ThemeProvider>
  );
}

export default App;
