import React from "react";
import { BsArrowLeft, BsArrowRight, BsPencil, BsTrash } from "react-icons/bs";

const TaskList = (props) => {

  
  
  return (
    <div className="col-sm-12 card p-2">
      <div className="row">
        <div className="col-md-6">{props.name}</div>
        <div className="col-md-6 d-flex justify-content-end">
          <span className="mx-2" onClick={props.stage !== 0 ? () => props.updateTask(props.id, {'stage': props.stage-1},1):null}>
            <BsArrowLeft />
          </span>
          <span className="mx-2" onClick={props.stage !== 3 ? () => props.updateTask(props.id, {'stage': props.stage+1}, 1):null} >
            <BsArrowRight />
          </span>
          <span className="mx-2" onClick={()=>props.editTask(props)} >
            <BsPencil />
          </span>
          <span className="mx-2" onClick = {()=> props.deleteTask(props.id)}>
            <BsTrash />
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
