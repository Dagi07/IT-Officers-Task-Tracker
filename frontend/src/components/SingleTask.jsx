import React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import { red } from "@mui/material/colors";
import EditTask from "./EditTask";

const SingleTask = ({ specificTask }) => {
  // const classes = useStyles();
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <div className="single_task" key={specificTask.task_id}>
      <h6>{specificTask.task_detail}</h6>
      <div className="single_task__btns">
        <Fab
          color="secondary"
          size="small"
          aria-label="edit"
          variant="primary"
          onClick={() => setModalShow(true)}
          sx={{ zIndex: 0 }}
        >
          <EditIcon />
        </Fab>
        {modalShow && (
          <EditTask
            specificTask={specificTask}
            setModalShow={setModalShow}
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        )}
        <IconButton
          aria-label="delete"
          sx={{
            ml: 1,
            "&:hover": {
              opacity: 0.9,
            },
          }}
        >
          <DeleteIcon sx={{ color: red[50] }} />
        </IconButton>
      </div>
    </div>
  );
};

export default SingleTask;
