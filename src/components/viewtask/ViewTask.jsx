import React, { useEffect, useState } from "react";
import TaskViewer from "../common/TaskViewer";
import { Button } from "react-bootstrap";
import axios from "axios";

const ViewTask = () => {
  const { _id } = JSON.parse(localStorage.getItem("user"));
  const [taskname, setTaskname] = useState([]);
  const [manageState, setManageState] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios
      .get(`https://main--guileless-otter-a3993d.netlify.app/get_tasks`, {
        params: { userid: _id, status: 1, page: page, limit: 4 },
      })
      .then((res) => {
        setTaskname(res.data.data);
        setManageState(false);
      })
      .catch((err) => console.log(err));
  }, [manageState, _id, page]);

  const updatedTaskStatus = (_id, e) => {
    let status = 1;

    if (e.target.id === "delete") {
      status = 2;
    } else if (e.target.id === "completed") {
      status = 0;
    }

    axios
      .put(
        `https://main--guileless-otter-a3993d.netlify.app/edit_task?task_id=${_id}`,
        {
          status: status,
        }
      )
      .then((res) => setManageState(true))
      .catch((err) => console.log(err));
  };

  return (
    <div className="login_inner_container">
      <div className="login_page_header">
        <p>View List</p>
      </div>
      {taskname.map((ele, index) => {
        return (
          <TaskViewer
            key={index}
            data={{
              ele: ele,
              updateTask: updatedTaskStatus,
              setManageState: setManageState,
            }}
          />
        );
      })}
      <Button onClick={() => setPage(page + 1)}>Load More</Button>
    </div>
  );
};

export default ViewTask;
