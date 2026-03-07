import { Outlet, useNavigate } from "react-router";
import { assets } from "../../assets/assets";
import Sidebar from "../../components/admin/Sidebar";

const Layout = () => {
  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
  };

  return (
    <>
      {/* admin navbar start */}
      <div className="flex items-center justify-between py-2 h-17.5 px-4 sm:px-12 border-b border-gray-200">
        <img
          className="w-32 sm:w-40 cursor-pointer"
          onClick={() => navigate("/")}
          src={assets.logo}
          alt="logo"
        />
        <button
          className="text-sm px-8 py-2 bg-blue-600 text-white rounded-full cursor-pointer"
          onClick={logout}
        >
          Logout
        </button>
      </div>
      {/* admin navbar end */}
      <div className="flex h-[calc(100vh-70px)]">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
