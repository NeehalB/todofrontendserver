import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const itemlist = [
  { name: "ADD TASK", path: "add_task" },
  { name: "VIEW TASK", path: "view_task" },
  { name: "COMPLETED TASK", path: "complete_task" },
];

const AppBar = () => {
  const { profileImage } = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <div className="login_inner_container appbar_inner_container">
      <div className="profile-image">
        <img
          src={`https://main--guileless-otter-a3993d.netlify.app/uploads/${profileImage}`}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />
      </div>
      <ul className="options-menu">
        {itemlist.map(({ name, path }, index) => {
          return (
            <NavLink to={path}>
              <li>{name}</li>
            </NavLink>
          );
        })}
        <li style={{ backgroundColor: "#d70000" }} onClick={logout}>
          LOGOUT
        </li>
      </ul>
    </div>
  );
};

export default AppBar;
