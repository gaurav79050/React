import React, { useState, useEffect } from "react";
import Section from "../Layouts/Section";
import BasicCard from "../BasicCard";
import TaskAccordian from "../Taskmgmt/TaskAccordian";
import TaskList from "../Taskmgmt/TaskList";
import { useSelector, useDispatch } from "react-redux";
import { taskActions } from "../../Store/index";
import { getAllTask, updateTask, deleteTask, addTask } from "../Api";
import { toast } from "react-toastify";
import Modals from "../Layouts/EditTaskModals";
import { currentDate } from "../Helper";
const Taskmgmt = () => {
  const tasks = useSelector((state) => state.tasks);
  const { username } = useSelector((state) => state.auth);
  const [stageStatus, setStageStatus] = useState(false);
  const [input, setInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [updateTaskdata, setupdateTaskdata] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    let alltask = async () => {
      try {
        let response = await getAllTask(username);
        let backlog = response.filter((item) => item.stage == 0);
        let todo = response.filter((item) => item.stage == 1);
        let ongoing = response.filter((item) => item.stage == 2);
        let done = response.filter((item) => item.stage == 3);
        dispatch(taskActions.fetch({ backlog, todo, ongoing, done }));
      } catch (error) {
        console.log(error);
      }
    };

    alltask();
  }, [stageStatus, showModal]);

  let handleUpdate = async (taskId, updatedTaskData , stage = 0) => {
    try {
      await updateTask(taskId, updatedTaskData, stage);
      setStageStatus((stageStatus) => !stageStatus);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  let handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      setStageStatus((stageStatus) => !stageStatus);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  let createTask = () => {
    if (input == "") {
      toast.error("Please enter Task name");
      return;
    }
    let newTask = {
      name: input.trim(),
      stage: 0,
      priority: "0",
      deadline: "",
      created_by: username,
      created_at: currentDate,
      updated_at: currentDate,
    };
    addTask(newTask);
    setInput("");
    setStageStatus((stageStatus) => !stageStatus);
  };

  let handleEdit = (taskdetails) => {
    console.log(taskdetails);
    setupdateTaskdata({ ...taskdetails });
    setShowModal(true);
  };

  let handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Section pageTitle="Task Management">
        <div className="dashboard-container">
          <BasicCard>
            <div className="input-group">
              <input
                type="text"
                className="form-control p-2"
                placeholder="Enter Task name"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                className="btn btn-primary"
                type="button"
                onClick={createTask}
              >
                Create Task
              </button>
            </div>
          </BasicCard>
        </div>
        <Section>
          <div className="row">
            <div className="col-sm-12 col-md-3">
              <TaskAccordian eventkey="0" title="Backlog" key="0">
                {tasks.backlog.length === 0 ? (
                  <div className="col-sm-12 card m-auto w-100">
                    <p>No task Found</p>
                  </div>
                ) : (
                  tasks.backlog.map((item) => (
                    <TaskList
                      key={item.id}
                      updateTask={handleUpdate}
                      deleteTask={handleDelete}
                      editTask={handleEdit}
                      {...item}
                    />
                  ))
                )}
              </TaskAccordian>
            </div>
            <div className="col-sm-12 col-md-3">
              <TaskAccordian eventkey="1" title="Todo" key="1">
                {tasks.todo.length === 0 ? (
                  <div className="col-sm-12 card m-auto">
                    <p>No task Found</p>
                  </div>
                ) : (
                  tasks.todo.map((item) => (
                    <TaskList
                      key={item.id}
                      updateTask={handleUpdate}
                      deleteTask={handleDelete}
                      editTask={handleEdit}
                      {...item}
                    />
                  ))
                )}
              </TaskAccordian>
            </div>
            <div className="col-sm-12 col-md-3">
              <TaskAccordian eventkey="2" title="Ongoing" key="2">
                {tasks.ongoing.length === 0 ? (
                  <div className="col-sm-12 card m-auto w-100">
                    <p>No task Found</p>
                  </div>
                ) : (
                  tasks.ongoing.map((item) => (
                    <TaskList
                      key={item.id}
                      updateTask={handleUpdate}
                      deleteTask={handleDelete}
                      editTask={handleEdit}
                      {...item}
                    />
                  ))
                )}
              </TaskAccordian>
            </div>
            <div className="col-sm-12 col-md-3">
              <TaskAccordian eventkey="3" title="Completed" key="3">
                {tasks.done.length === 0 ? (
                  <div className="col-sm-12 card m-auto w-100">
                    <p>No task Found</p>
                  </div>
                ) : (
                  tasks.done.map((item) => (
                    <TaskList
                      key={item.id}
                      updateTask={handleUpdate}
                      deleteTask={handleDelete}
                      editTask={handleEdit}
                      {...item}
                    />
                  ))
                )}
              </TaskAccordian>
            </div>
          </div>

          <Modals
            showModal={showModal}
            handleCloseModal={handleCloseModal}
            updateTaskdata={updateTaskdata}
          />
        </Section>
      </Section>
    </>
  );
};
export default Taskmgmt;
