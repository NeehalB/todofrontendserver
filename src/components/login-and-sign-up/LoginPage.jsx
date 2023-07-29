import axios from "axios";
import { Button, Container } from "react-bootstrap";
import loginImg from "../../media/login_page_img.png";
import { useReducer } from "react";
import LSInputField from "../common/LSInputField";
import { Link, useNavigate } from "react-router-dom";

const reducer = (state, action) => {
  switch (action.type) {
    case "usernameValidation":
      if (action.payload === "") {
        return {
          ...state,
          usernameError: "Please enter username.",
        };
      } else {
        return {
          ...state,
          username: action.payload,
          usernameError: "",
        };
      }
    case "passwordValidation":
      if (action.payload === "") {
        return {
          ...state,
          password: "",
          passwordError: "Please enter password.",
        };
      } else {
        return {
          ...state,
          password: action.payload,
          passwordError: "",
        };
      }

    default:
      return state;
  }
};

const LoginPage = () => {
  const initialValue = {
    username: "",
    usernameError: "",
    password: "",
    passwordError: "",
  };
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialValue);
  const getUserData = () => {
    axios
      .get(
        `https://mernapptodobackend-2epa.onrender.com/get_user/?username=${state.username}&password=${state.password}`
      )
      .then((res) => {
        localStorage.setItem("token", res.data.data._id);
        localStorage.setItem("user", JSON.stringify(res.data.data));
        navigate(`/view_task`);
        console.log(localStorage.getItem("user"));
      })
      .catch((error) => console.log(error));
  };

  return (
    <Container fluid className="login_main_container">
      <div className="login_inner_container">
        <div className="login_form_container">
          <img src={loginImg} alt="IMG" />
        </div>
        <div className="login_form_container">
          <div className="login_page_header">
            <p>Member Login</p>
          </div>
          <LSInputField
            inputFieldData={{
              type: "text",
              placeholder: "Username",
              dispatch: dispatch,
              validationType: "usernameValidation",
              error: state.usernameError,
            }}
          />
          <LSInputField
            inputFieldData={{
              type: "password",
              placeholder: "Password",
              dispatch: dispatch,
              validationType: "passwordValidation",
              error: state.passwordError,
            }}
          />
          <Button
            variant="success"
            className={
              state.username !== "" && state.password !== ""
                ? "login_form_button"
                : "login_form_button disabled"
            }
            onClick={getUserData}
          >
            Login
          </Button>
          <Link to="/sign_up_page">Create your account &nbsp; &rarr;</Link>
        </div>
      </div>
    </Container>
  );
};

export default LoginPage;
