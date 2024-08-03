import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { ThemeProvider } from "./components/ThemeProvider";
import { SignIn } from "./pages/SignIn";
import {
  AuthProvider,
  FirestoreProvider,
  StorageProvider,
  useFirebaseApp,
} from "reactfire";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { Dashboard } from "./pages/Dashboard";
import { UserHome } from "./pages/UserHome";
import { Profile } from "./pages/Profile";
import { Transactions } from "./pages/Transactions/Transactions";
import {
  CACHE_SIZE_UNLIMITED,
  connectFirestoreEmulator,
  Firestore,
  initializeFirestore,
  persistentLocalCache,
  persistentSingleTabManager,
} from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage";
import { PaymentInstruments } from "./pages/PaymentInstruments/PaymentInstruments";

function App() {
  const app = useFirebaseApp();
  const firestoreInstance: Firestore = initializeFirestore(app, {
    localCache: persistentLocalCache({
      tabManager: persistentSingleTabManager({ forceOwnership: true }),
      cacheSizeBytes: CACHE_SIZE_UNLIMITED
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
      <FirestoreProvider sdk={firestoreInstance}>
        <StorageProvider sdk={storageInstance}>
          <AuthProvider sdk={authInstance}>
            <Outlet />
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/sign-in" element={<SignIn />}></Route>
              <Route path="/user-home" element={<UserHome />}>
                <Route path="dashboard" element={<Dashboard />}></Route>
                <Route path="transactions" element={<Transactions />}></Route>
                <Route path="profile" element={<Profile />}></Route>
                <Route
                  path="payment-instruments"
                  element={<PaymentInstruments />}
                ></Route>
              </Route>
              <Route path="*" element={<Home />}></Route>
            </Routes>
          </AuthProvider>
        </StorageProvider>
      </FirestoreProvider>
    </ThemeProvider>
  );
}

export default App;
