import React, { useRef, useState } from "react";
import axios from "axios";

const TaskViewer = ({ data }) => {
  const { ele, updateTask, setManageState } = data;
  const { task_name, creator_name, _id } = ele;
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(task_name);
  const inputTask = useRef();

  const editTaskName = () => {
    console.log("Hello");
    axios
      .put(
        `https://main--guileless-otter-a3993d.netlify.app/edit_task?task_id=${_id}`,
        {
          taskname: inputTask.current.value,
        }
      )
      .then((res) => {
        setEdit(false);
        setManageState(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="taskviewer_outer_container">
      <div className="taskviewer_inner_container">
        {edit ? (
          <input
            type="text"
            className="login_form_input"
            ref={inputTask}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        ) : (
          <div className="taskname">
            <p>{task_name}</p>
            <hr />
            <span style={{ fontSize: "17px" }}>
              Author name: {creator_name}
            </span>
          </div>
        )}
      </div>
      {edit ? (
        <div className="taskviewer_inner_container">
          <i
            id="update"
            className="bi bi-check2-circle"
            onClick={editTaskName}
          ></i>
        </div>
      ) : (
        <div className="taskviewer_inner_container">
          <i
            id="edit"
            className="bi bi-pencil"
            onClick={() => setEdit(true)}
          ></i>
          <i
            id="completed"
            className="bi bi-check-all"
            onClick={(e) => updateTask(_id, e)}
          ></i>
          <i
            id="delete"
            className="bi bi-trash"
            onClick={(e) => updateTask(_id, e)}
          ></i>
        </div>
      )}
    </div>
  );
};

export default TaskViewer;
