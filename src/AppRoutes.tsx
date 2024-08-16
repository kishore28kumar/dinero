import { Route, Routes } from "react-router-dom";
import {
  Home,
  SignIn,
  Dashboard,
  UserHome,
  Profile,
  Transactions,
  PaymentInstruments,
  Categories,
  NotFoundPage,
} from "@pages";

function AppRoutes() {
  return (
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
        <Route path="categories" element={<Categories />}></Route>
      </Route>
      <Route path="*" element={<NotFoundPage />}></Route>
    </Routes>
  );
}

export default AppRoutes;
