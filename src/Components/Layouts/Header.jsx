import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Header = ({ menuItems, heading }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          {heading}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            {menuItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.url}
                activeclassname="activeClicked"
                className="nav-link active"
                onClick={item.logout ? item.logout : ""}
              >
                {item.title}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
