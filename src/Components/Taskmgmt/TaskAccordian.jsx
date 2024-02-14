import React, { Children } from "react";
import Accordion from "react-bootstrap/Accordion";
const TaskAccordian = ({ eventkey, title, children }) => {
  return (
    <>
     <Accordion
              defaultActiveKey={["0", "1", "2", "3"]}
              className="d-flex flex-wrap"
            >
      <Accordion.Item eventKey={eventkey} className="m-3 w-100">
        <Accordion.Header>{title}</Accordion.Header>
        <Accordion.Body>{children}</Accordion.Body>
      </Accordion.Item>
      </Accordion>
    </>
  );
};

export default TaskAccordian;
