import { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useParams } from "react-router-dom";
import { useTasksContext } from "../hooks/useTasksContext";
import dayjs from "dayjs";
import { ItOfficersContext } from "../context/ItOfficersContext";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";

const serverUrl = import.meta.env.VITE_API_serverUrl;

function EditTaskII(props) {
  const { tasks, dispatch } = useTasksContext();
  const { doneDay } = useParams();
  const [warningMessage, setWarningMessage] = useState({});
  const [itGuysList] = useContext(ItOfficersContext);

  console.log(props.each.completion_time.split(" ")[1]);
  const x = props.each.completion_time.split(" ")[1];

  const [updateII, setUpdateII] = useState({
    taskId: `${props.each.later_id}`,
    taskDetail: `${props.each.later_detail}`,
    completionTime: `${props.each.completion_time}`,
    taskAssignee: `${props.each.task_assignee}`,
  });
  // console.log(props.each)
  const handleChange = (e) => {
    setUpdateII({
      ...updateII,
      [e.target.name]: e.target.value,
    });
  };
  async function handleSubmit(e) {
    try {
      // props.onTaskSubmit();
      e.preventDefault();
      console.log("task update", updateII.completionTime);
      const serverResponse = await fetch(`${serverUrl}/${props.url}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateII),
      });
      const result = await serverResponse.json();

      if (serverResponse.ok) {
        const getTasks = async () => {
          let backendResult = await fetch(`${serverUrl}/later`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
          let res = await backendResult.json();
          props.setlaterlist(() => res);
        };
        getTasks();
        props.setshoweditii(false);
      } else if (result.status === "forbidden") {
        console.log(result);
        setWarningMessage(result);
      }
    } catch (error) {
      console.log(error);
    }
  }
  warningMessage && console.log(warningMessage.field);
  const zz = dayjs(props.each.completion_time);

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
            <form onSubmit={handleSubmit} className="form-container">
              <div className="form-row">
                <div className="textarea">
                  <textarea
                    className="form-control"
                    name="taskDetail"
                    id="taskDetail"
                    rows="2"
                    placeholder="Task Detail"
                    required
                    value={updateII.taskDetail}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
              <div className="form-row">
                <div className="edit_task_ii">
                  <label htmlFor="completionTime" className="form-label">
                    Estimated task completion time:
                  </label>
                  <br />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileTimePicker
                      name="completionTime"
                      id="completionTime"
                      // value={updateII.completionTime}
                      defaultValue={zz}
                      className="time_picker_ii"
                      onChange={(newTimeValue) =>
                        setUpdateII({
                          ...updateII,
                          completionTime: newTimeValue,
                        })
                      }
                    />
                  </LocalizationProvider>
                </div>
                <div className="taskAssignee mt-2">
                  <label htmlFor="taskAssignee" className="form-label">
                    Task assignee:
                  </label>
                  <select
                    id="taskAssignee"
                    onChange={handleChange}
                    value={updateII.taskAssignee}
                    name="taskAssignee"
                    size="1"
                    className="form-select"
                  >
                    {itGuysList &&
                      itGuysList.map((itguy) => (
                        <option key={itguy.id} value={itguy.first_name}>
                          {itguy.first_name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="submit-button mt-3 float-end">
                  <button className="btn btn-primary" type="submit">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
}

export default EditTaskII;
