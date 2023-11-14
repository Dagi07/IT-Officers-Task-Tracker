import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useTasksContext } from "../hooks/useTasksContext";

function EditTask(props) {
  const { tasks, dispatch } = useTasksContext();
  // const currentTask = tasks.filter((ct) => ct.task_id === props.taskid);

  const [updateTask, setUpdateTask] = useState({
    idTask: `${props.specificTask.task_id}`,
    taskDetail: `${props.specificTask.task_detail}`,
    taskCompleted: `${props.specificTask.task_completed}`,
    doneBy: `${props.specificTask.done_by}`,
  });

  // useEffect(() => {
  //   const fetchTasksToUpdate = async () => {
  //     const serverResponse = await fetch(`http://localhost:6800/task`, {
  //       method: "GET",
  //       headers: { "Content-Type": "application/json" },
  //     });
  //     const result = await serverResponse.json();
  //     // setDayExpand(() => result);
  //     if (serverResponse.ok) {
  //       // console.log("noteexp srvresp", result);
  //       dispatch({ type: "SET_TASKS", payload: result });
  //     }
  //   };
  //   fetchTasksToUpdate();
  // }, [dispatch]);

  const handleChange = (e) => {
    setUpdateTask({
      ...updateTask,
      [e.target.name]: e.target.value,
    });
  };
  async function handleSubmit(e) {
    try {
      // props.onTaskSubmit();
      e.preventDefault();
      // console.log("task update", updateTask);
      const serverResponse = await fetch(`http://localhost:6800/task`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateTask),
      });
      const result = await serverResponse.json();

      if (serverResponse.ok) {
        // setError(null)
        // setTitle('')
        // setLoad('')
        // setReps('')
        dispatch({ type: "SET_TASKS", payload: result });
        props.setModalShow(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        // dialogClassName="modal-20w"
        centered
      >
        <div className="updateModal">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Edit Task
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* <h4>Centered Modal</h4> */}
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="">
                  <textarea
                    className="form-control my-4"
                    rows="2"
                    type="text"
                    placeholder="Task detail"
                    name="taskDetail"
                    id="taskDetail"
                    onChange={handleChange}
                    value={updateTask.taskDetail}
                    required
                  ></textarea>
                </div>

                <div className="edit-dropdowns d-flex justify-content-between">
                  {/* ### Task Completed dropdown ### */}
                  <div className=" my-4 me-2">
                    <label htmlFor="taskCompleted" className="form-label">
                      Task Completed:
                    </label>
                    <select
                      id="taskCompleted"
                      onChange={handleChange}
                      value={updateTask.taskCompleted}
                      name="taskCompleted"
                      size="1"
                      className="form-select"
                    >
                      <option value={1}>Yes</option>
                      <option value={0}>Not yet</option>
                    </select>
                  </div>

                  {/* ### Task done by dropdown ### */}
                  <div className=" my-4 ps-2 ps-md-5">
                    <label htmlFor="doneBy" className="form-label">
                      Task done by:
                    </label>
                    <select
                      id="doneBy"
                      onChange={handleChange}
                      value={updateTask.doneBy}
                      name="doneBy"
                      size="1"
                      className="form-select"
                    >
                      <option value="Sirak">Sirak</option>
                      <option value="Dagmawi">Dagmawi</option>
                      <option value="Tsegaye">Tsegaye</option>
                    </select>
                  </div>
                </div>
                <div className="col-12 mt-4">
                  <div className="d-flex justify-content-end">
                    <button className="btn btn-primary" type="submit">
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </Modal.Body>
          {/* <Modal.Footer> */}
          {/* <Button onClick={props.onHide}>Close</Button> */}
          {/* </Modal.Footer> */}
        </div>{" "}
      </Modal>
    </>
  );
}

export default EditTask;
