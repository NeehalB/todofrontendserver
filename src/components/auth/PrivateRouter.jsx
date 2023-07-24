import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import AppBar from "../common/AppBar";

const PrivateRouter = () => {
  const [auth, setAuth] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    setAuth(token);
  }, []);

  return (
    <>
      {auth ? (
        <Container fluid className="login_main_container">
          <AppBar />
          <Outlet />
        </Container>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default PrivateRouter;
