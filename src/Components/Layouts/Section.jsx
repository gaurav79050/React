import React from "react";
const Section = ({ pageTitle, children }) => {
  return (
    <>
      <section className="card p-2 bg-light">
        <div className="pagettitle" >
          <h2>{pageTitle}</h2>
        </div>

        {children}
      </section>
    </>
  );
};
export default Section;
