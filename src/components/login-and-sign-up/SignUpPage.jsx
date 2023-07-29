import { useReducer, useRef } from "react";
import { Button, Container } from "react-bootstrap";
import LSInputField from "../common/LSInputField";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const reducer = (state, action) => {
  const passwordRegex = new RegExp(
    "^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$"
  );
  const emailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
  switch (action.type) {
    case "firstNameValidation":
      if (action.payload === "") {
        return {
          ...state,
          firstname: "",
          firstnameError: `Please enter first name.`,
        };
      } else {
        return {
          ...state,
          firstname: action.payload,
          firstnameError: "",
        };
      }
    case "lastNameValidation":
      if (action.payload === "") {
        return {
          ...state,
          lastname: "",
          lastnameError: `Please enter last name.`,
        };
      } else {
        return {
          ...state,
          lastname: action.payload,
          lastnameError: "",
        };
      }
    case "usernameValidation":
      if (action.payload === "") {
        return {
          ...state,
          username: "",
          usernameError: `Please enter user name.`,
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
      } else if (passwordRegex.test(action.payload)) {
        return {
          ...state,
          password: "",
          passwordError: "Password format incorrect.",
        };
      } else {
        return {
          ...state,
          password: action.payload,
          passwordError: "",
        };
      }
    case "emailValidation":
      if (action.payload === "") {
        return {
          ...state,
          email: "",
          emailError: "Please enter email.",
        };
      } else if (!emailRegex.test(action.payload)) {
        return {
          ...state,
          email: "",
          emailError: "Email format incorrect.",
        };
      } else {
        return {
          ...state,
          email: action.payload,
          emailError: "",
        };
      }
    case "confirmPasswordValidation":
      if (action.payload === "") {
        return {
          ...state,
          confirmPassword: "",
          confirmPasswordError: "Please enter password.",
        };
      } else if (state.password !== action.payload) {
        return {
          ...state,
          confirmPassword: "",
          confirmPasswordError: "Password do not match.",
        };
      } else {
        return {
          ...state,
          confirmPassword: action.payload,
          confirmPasswordError: "",
        };
      }

    default:
      return state;
  }
};

const SignUpPage = () => {
  const initialValue = {
    firstname: "",
    firstnameError: "",
    lastname: "",
    lastnameError: "",
    username: "",
    usernameError: "",
    email: "",
    emailError: "",
    password: "",
    passwordError: "",
    confirmPassword: "",
    confirmPasswordError: "",
  };
  const [state, dispatch] = useReducer(reducer, initialValue);
  const imageFile = useRef();
  const navigate = useNavigate();

  const addUserData = () => {
    console.log(imageFile.current.files[0].name);
    const formData = new FormData();
    formData.append("first_name", state.firstname);
    formData.append("last_name", state.lastname);
    formData.append("username", state.username);
    formData.append("email", state.email);
    formData.append("password", state.password);
    formData.append("profileImage", imageFile.current.files[0]);
    console.log(formData);
    axios
      .post(
        "https://mernapptodobackend-2epa.onrender.com/add_new_user",
        formData
      )
      .then((res) => {
        if (res.data.message === "New user has been added successfully.") {
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container fluid className="login_main_container">
      <div className="login_inner_container">
        <div className="login_page_header">
          <p>Member Sign Up</p>
        </div>
        <div className="login_form_container">
          {/* First Name */}
          <LSInputField
            inputFieldData={{
              type: "text",
              placeholder: "First Name",
              dispatch: dispatch,
              validationType: "firstNameValidation",
              error: state.firstnameError,
            }}
          />
          {/* Email */}
          <LSInputField
            inputFieldData={{
              type: "email",
              placeholder: "Email",
              dispatch: dispatch,
              validationType: "emailValidation",
              error: state.emailError,
            }}
          />
          {/* Password */}
          <LSInputField
            inputFieldData={{
              type: "password",
              placeholder: "Password",
              dispatch: dispatch,
              validationType: "passwordValidation",
              error: state.passwordError,
            }}
          />
        </div>
        <div className="login_form_container">
          {/* Last name */}
          <LSInputField
            inputFieldData={{
              type: "text",
              placeholder: "Last Name",
              dispatch: dispatch,
              validationType: "lastNameValidation",
              error: state.lastnameError,
            }}
          />
          {/* User name */}
          <LSInputField
            inputFieldData={{
              type: "text",
              placeholder: "User Name",
              dispatch: dispatch,
              validationType: "usernameValidation",
              error: state.usernameError,
            }}
          />
          {/* Confirm Password */}
          <LSInputField
            inputFieldData={{
              type: "password",
              placeholder: "Confirm Password",
              dispatch: dispatch,
              validationType: "confirmPasswordValidation",
              error: state.confirmPasswordError,
            }}
          />
        </div>
        <input type="file" ref={imageFile} name="profileImage" />
        <Button
          variant="success"
          className={
            state.firstname !== "" &&
            state.lastname !== "" &&
            state.email !== "" &&
            state.password !== "" &&
            state.confirmPassword !== ""
              ? "sign_up_form_button"
              : "sign_up_form_button disabled"
          }
          onClick={addUserData}
        >
          Sign Up
        </Button>
      </div>
    </Container>
  );
};

export default SignUpPage;
