import { useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const { _id, username } = JSON.parse(localStorage.getItem("user"));
  const [taskname, setTaskname] = useState("");
  const [tasknameError, setTasknameError] = useState("");
  const [creatorname, setCreatorname] = useState(username);
  const navigate = useNavigate()

  const addTaskData = () => {
    axios
      .post(`https://main--guileless-otter-a3993d.netlify.app/add_task`, {
        task_name: taskname,
        creator_name: creatorname,
        user_id: _id,
      })
      .then((res) => navigate('/view_task'))
      .catch((err) => console.log(err));
  };

  const taskNameValidation = (e) => {
    if (e.target.value === "") {
      setTasknameError("Please enter task name.");
      setTaskname("");
    } else {
      setTaskname(e.target.value);
    }
  };

  const usernameValidation = (e) => {
    if (e.target.value !== "") {
      setCreatorname(e.target.value);
    }
  };

  return (
    <div className="login_inner_container add_task_inner_container">
      <div className="login_page_header">
        <p>Add Task</p>
      </div>
      <div className="ls_input_field">
        <input
          className={`login_form_input`}
          type="text"
          placeholder="Task name ..."
          onChange={(e) => {
            taskNameValidation(e);
          }}
        />
        <p className="error_message">{tasknameError}</p>
      </div>
      <div className="ls_input_field">
        <input
          className={`login_form_input`}
          type="text"
          placeholder="Author name ..."
          onChange={(e) => {
            usernameValidation(e);
          }}
        />
        <p className="error_message"></p>
      </div>
      <Button
        variant="success"
        className={
          taskname !== ""
            ? "sign_up_form_button"
            : "sign_up_form_button disabled"
        }
        onClick={addTaskData}
      >
        Add Task
      </Button>
    </div>
  );
};

export default AddTask;
