import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const serverUrl = import.meta.env.VITE_API_serverUrl;

function DeleteTask(props) {
  const handleClick = async () => {
    try {
      const serverResponse = await fetch(
        `${serverUrl}/task/${props.specificTask.task_id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      const result = await serverResponse.json();

      console.log(result);

      // if (serverResponse.ok) {
      //   const getTasks = async () => {
      //     let backendResult = await fetch(`${serverUrl}/getTasks/${doneDay}`, {
      //       method: "GET",
      //       headers: { "Content-Type": "application/json" },
      //     });
      //     let res = await backendResult.json();
      //     props.settaskslistea(() => res);
      //   };
      //   getTasks();
      //   props.setModalShow(false);
      //   props.settaskslistea(() => result);
      //   props.setdeletemodal(false);
      // }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        {...props}
        size="sm"
        show={props.deletemodal}
        onHide={() => props.setdeletemodal(false)}
        aria-labelledby="example-modal-sizes-title-xl"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-xl"></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure that you want to delete this task?
          <br />
          <Button
            variant="primary"
            onClick={handleClick}
            style={{ float: "right" }}
          >
            Yes
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DeleteTask;
