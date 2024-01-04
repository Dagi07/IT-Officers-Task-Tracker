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

  const [updateII, setUpdateII] = useState({
    task_id: `${props.each.task_id}`,
    taskDetail: `${props.each.taskDetail}`,
    completionTime: `${props.each.completionTime}`,
    taskAssignee: `${props.each.taskAssignee}`,
  });

 
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
      // console.log("task update", updateII);
      const serverResponse = await fetch(`${serverUrl}/later`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateII),
      });
      const result = await serverResponse.json();

      if (serverResponse.ok) {
        const getTasks = async () => {
          let backendResult = await fetch(
            `${serverUrl}/getTasks/${doneDay ? doneDay : dayjs().format("YYYY-MM-DD")
            }`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );
          let res = await backendResult.json();
          props.settaskslist(() => res);
        };
        getTasks();
        props.setShowEditII(false);
      } else if (result.status === "forbidden") {
        console.log(result);
        setWarningMessage(result);
      }
    } catch (error) {
      console.log(error);
    }
  }
  warningMessage && console.log(warningMessage.field);
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
            <form  onSubmit={handleSubmit}>
          <span className="textarea">
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
          </span>
          <span className="lf_rightSec">
            <span className="lf_completionTime">
              <label htmlFor="completionTime">
                Estimated task completion time:
              </label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileTimePicker
                  name="completionTime"
                  id="completionTime"
                  value={updateII.completionTime}
                  defaultValue={dayjs().format("hh:mm a")}
                  // minTime={dayjs()}
                  onChange={(newTimeValue) =>
                    setupdateII({ ...updateII, completionTime: newTimeValue })
                  }
                />
              </LocalizationProvider>
            </span>
            <span>
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
                {itGuysList && itGuysList.map(itguy =>
                  (<option value={itguy.first_name}>{itguy.first_name}</option>)
                )}
              </select>
            </span>
            <span>
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </span>
          </span>
        </form>
          </Modal.Body>
       
        </div>
      </Modal>
    </>
  );
}

export default EditTaskII;
