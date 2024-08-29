import { FirebaseApp } from "firebase/app";
import {
  AppCheck,
  initializeAppCheck,
  ReCaptchaV3Provider,
} from "firebase/app-check";
import { ReactNode } from "react";
import { AppCheckProvider } from "reactfire";

type Props = {
  children: ReactNode;
  app: FirebaseApp;
};
export function WithAppCheckProvider({ app, children }: Props) {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    return <>{children}</>;
  } else {
    const appCheckInstance: AppCheck = initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(
        "6LdxSyQqAAAAAH-8Rwe7fILh7IYxDdiu5CfAotZF"
      ),
      isTokenAutoRefreshEnabled: true,
    });
    return (
      <AppCheckProvider sdk={appCheckInstance}>{children}</AppCheckProvider>
    );
  }
}
