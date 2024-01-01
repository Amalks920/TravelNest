import { Outlet } from "react-router-dom";
import { NavbarDefault } from "./NavbarDefault";
import { Footer } from "./Footer";
import { Sidebar } from "./Sidebar";
import { useSelector } from "react-redux";
import { selectToken } from "../features/authentication/services/loginSlice";
import { NavbarUser } from "./NavbarUser";

const PageContainer = () => {
  return (
    <div className="grid grid-rows-[30px,auto,auto] grid-cols-[49%,49%] gap-2  min-h-screen">
      <header className="col-span-2 row-span-1">
        <NavbarUser />
      </header>

      <main className=" col-span-2 row-span-2 overflow-hidden m-2">
        <div className="flex justify-center items-center min-h-screen w-full max-w-[100vw]">
          <Outlet />
        </div>
      </main>

      <footer className="col-span-2 row-span-1 border-2 overflow-hidden">
        <Footer />
      </footer>
    </div>
  );
};

export default PageContainer;
