  import React from "react";
  import { useState, useEffect } from "react";
  import { Modal, Button, Form } from "react-bootstrap";
  import { updateTask } from "../Api";
  import { currentDate } from "../Helper";
  const EditTaskModals = (props) => {
    const [name, setName] = useState("");
    const [deadline, setDeadline] = useState("");
    const [priority, setPriority] = useState("");
    const priorities = ["Low", "Medium", "High"];
    useEffect(() => {
      if (props.updateTaskdata) {
        setName(props.updateTaskdata.name);
        setDeadline(props.updateTaskdata.deadline);
        setPriority(props.updateTaskdata.priority);
      }
    }, [props.updateTaskdata]);

    let handleSubmit = async (taskId) => {
      
      let updatedTask = {
        name: name.trim(),
        stage: props.updateTaskdata.stage,
        priority: priority,
        deadline: deadline,
        created_by: props.updateTaskdata.created_by,
        created_at: props.updateTaskdata.created_at,
        updated_at: currentDate,
      };

      try {
        await updateTask(taskId, updatedTask);
        props.handleCloseModal()
      } catch (error) {
        console.error("Error updating task:", error);
      }
    };


    return (
      <Modal show={props.showModal} onHide={props.handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter task name"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Priority</Form.Label>
              <Form.Control as="select" onChange = {(e) => setPriority(e.target.value)}>
                {priorities.map((priorityValue, index) => (
                  <option
                    key={index}
                    selected={priority == priorityValue ? "selected" : ""} 
                  >
                    {priorityValue}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Deadline</Form.Label>
              <Form.Control
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={() =>handleSubmit(props.updateTaskdata.id)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  export default EditTaskModals;
