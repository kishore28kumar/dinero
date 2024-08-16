import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { FirebaseAppProvider } from "reactfire";
import { firebaseConfig } from "./FirebaseConfig";
import { Toaster } from "@/components/ui/sonner";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <BrowserRouter>
        <App />
        <Toaster position="bottom-center" />
      </BrowserRouter>
    </FirebaseAppProvider>
  </React.StrictMode>
);
