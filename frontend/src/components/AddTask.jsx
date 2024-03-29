import React, { useContext, useEffect, useState } from "react";
import { OndutyContext } from "../context/OndutyContext";
import { SidebarContext } from "../context/SidebarContext";
import { ItOfficersContext } from "../context/ItOfficersContext";

const serverUrl = import.meta.env.VITE_API_serverUrl;

const AddTask = ({ taskslist, settaskslist }) => {
  const [itGuysList] = useContext(ItOfficersContext);
  const [onDutyGlobal] = useContext(OndutyContext);
  const [sidebarTaskLength, setSidebarTaskLength] = useContext(SidebarContext);

  const [taskadd, setTaskadd] = useState({
    task_detail: "",
    task_completed: 1,
    done_by: "",
  });

  useEffect(() => {
    // Update the taskadd state when onDutyGlobal changes
    setTaskadd((prevTaskadd) => ({
      ...prevTaskadd,
      done_by: onDutyGlobal,
    }));
  }, [onDutyGlobal]);

  const handleChange = (e) => {
    setTaskadd({
      ...taskadd,
      [e.target.name]: e.target.value,
    });
  };

  async function handleSubmit(e) {
    try {
      // props.onTaskSubmit();
      e.preventDefault();
      // console.log("task add", taskadd);
      const serverResponse = await fetch(`${serverUrl}/task`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskadd),
      });
      const result = await serverResponse.json();
      console.log("srv add resp", result);

      if (serverResponse.ok) {
        // setError(null)
        // setTitle('')
        // setLoad('')
        // setReps('')
        setTaskadd({
          task_detail: "",
          task_completed: 1,
          done_by: onDutyGlobal,
        });
        console.log("taskslist", taskslist);
        settaskslist([...taskslist, result]);

        let backendResult = await fetch(`${serverUrl}/getDays`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        let res = await backendResult.json();
        setSidebarTaskLength(res);

        console.log("new task added:", result);
        // dispatch({ type: "ADD_TASK", payload: result });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container-fluid p-4 addtask border border-2">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-xl-8">
            <textarea
              className="form-control mb-3"
              rows="2"
              type="text"
              placeholder="Task detail"
              name="task_detail"
              id="task_detail"
              onChange={handleChange}
              value={taskadd.task_detail}
              required
            ></textarea>
          </div>

          <div className="col-xl-4 row align-items-end">
            <div className="col-6 mb-3">
              <label htmlFor="task_completed" className="form-label">
                Task Completed:
              </label>
              <select
                id="task_completed"
                onChange={handleChange}
                value={taskadd.task_completed}
                name="task_completed"
                size="1"
                className="form-select"
              >
                <option value={1}>Yes</option>
                <option value={0}>Not yet</option>
              </select>
            </div>

            <div className="col-6 mb-3">
              <label htmlFor="done_by" className="form-label">
                Task done by:
              </label>
              <select
                id="done_by"
                onChange={handleChange}
                value={taskadd.done_by}
                name="done_by"
                size="1"
                className="form-select"
              >
                {itGuysList &&
                  itGuysList.map((itguy) => (
                    <option value={itguy.first_name}>{itguy.first_name}</option>
                  ))}
              </select>
            </div>

            <div className="col-12">
              <div className="d-flex justify-content-end">
                <button className="btn btn-primary" type="submit">
                  Add Task
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTask;

// <div className="container-fluid p-4 addtask border border-2">
//   <form onSubmit={handleSubmit}>
//     <div className="row">
//       <div className="col-xl-8">
//         <textarea
//           className="form-control mb-3"
//           rows="2"
//           type="text"
//           placeholder="Task detail "
//           name="task_detail"
//           id="task_detail"
//           onChange={handleChange}
//           value={taskadd.task_detail}
//         ></textarea>
//       </div>

//       {/* <div className="row"> */}
//       <div className="col-xl-4 row dropdowns">
//         <div className="col-4 mb-3">
//           <label htmlFor="task_completed" className="col-12 form-label">
//             Task Completed:
//           </label>
//           <select
//             id="task_completed"
//             onChange={handleChange}
//             value={taskadd.task_completed}
//             name="task_completed"
//             size="1"
//             className="form-select"
//           >
//             <option value={1}>Yes</option>
//             <option value={0}>Not yet</option>
//           </select>
//         </div>

//         <div className="col-4  mb-3">
//           <label htmlFor="done_by" className="col-12 form-label">
//             Task done by:
//           </label>
//           <select
//             id="done_by"
//             onChange={handleChange}
//             value={taskadd.done_by}
//             name="done_by"
//             size="1"
//             className="form-select"
//           >
//             <option value="Sirak">Sirak</option>
//             <option value="Dagmawi">Dagmawi</option>
//             <option value="Tsegaye">Tsegaye</option>
//           </select>
//         </div>
//         <div className="button pe-4 col-4">
//           <button className="btn btn-primary" type="submit">
//             Add Task
//           </button>
//         </div>
//       </div>

//       {/* </div> */}
//     </div>
//   </form>
// </div>
