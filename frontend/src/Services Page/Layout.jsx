import { Outlet } from "react-router-dom";
import Navbar from "./Navbar"; // create your Navbar component

function Layout() {
  return (
    <div className="container mx-auto">
      <Navbar /> {/* Navbar will appear on all pages */}
      <main className=""> {/* optional spacing */}
        <Outlet /> {/* nested routes will render here */}
      </main>
    </div>
  );
}

export default Layout;
