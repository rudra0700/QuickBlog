import React from "react";
import { NavLink } from "react-router";
import { assets } from "../../assets/assets";

const Sidebar = () => {
  return (
    <div className="flex flex-col border-r border-gray-200 min-h-full pt-6">
      <NavLink
        end={true}
        to="/admin"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-blue-600/10 border-r-4 border-blue-600"}`
        }
      >
        <img src={assets.home_icon} className="min-w-4 w-5" alt="homeIcon" />
        <p className="hidden md:inline-block">Dashboard</p>
      </NavLink>
      <NavLink
        to="/admin/addblog"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-blue-600/10 border-r-4 border-blue-600"}`
        }
      >
        <img src={assets.add_icon} className="min-w-4 w-5" alt="homeIcon" />
        <p className="hidden md:inline-block">Add Blog</p>
      </NavLink>
      <NavLink
        to="/admin/listblog"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-blue-600/10 border-r-4 border-blue-600"}`
        }
      >
        <img src={assets.list_icon} className="min-w-4 w-5" alt="homeIcon" />
        <p className="hidden md:inline-block">Blog lists</p>
      </NavLink>
      <NavLink
        to="/admin/comments"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-blue-600/10 border-r-4 border-blue-600"}`
        }
      >
        <img src={assets.comment_icon} className="min-w-4 w-5" alt="homeIcon" />
        <p className="hidden md:inline-block">Comments</p>
      </NavLink>
    </div>
  );
};

export default Sidebar;
