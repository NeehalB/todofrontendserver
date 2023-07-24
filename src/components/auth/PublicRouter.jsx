import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRouter = () => {
  const [auth, setAuth] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    setAuth(token);
  }, []);

  return <>{!auth ? <Outlet /> : <Navigate to="/view_task" />}</>;
};

export default PublicRouter;
