import React, { useEffect, useState } from "react";
import axios from "axios";

const CompletedTask = () => {
  const { _id } = JSON.parse(localStorage.getItem("user"));
  const [taskname, setTaskname] = useState([]);
  useEffect(() => {
    axios
      .get(`https://mernapptodobackend-2epa.onrender.com/get_tasks`, {
        params: { userid: _id, status: 0 },
      })
      .then((res) => {
        setTaskname(res.data.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [_id]);
  return (
    <div className="login_inner_container">
      <div className="login_page_header">
        <p>Completed Task</p>
      </div>
      {taskname.map(({ task_name, creator_name }) => {
        return (
          <div className="taskviewer_outer_container completedtask_outer_container">
            <div className="taskviewer_inner_container completedtask_inner_container">
              <div className="taskname completedTask_name">
                <p>{task_name}</p>
                <hr />
                <span style={{ fontSize: "17px" }}>
                  Author name: {creator_name}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CompletedTask;
