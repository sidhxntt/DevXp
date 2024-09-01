import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default RootLayout;
