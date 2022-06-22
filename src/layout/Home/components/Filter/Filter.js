import React from "react";
import { Dropdown } from "react-bootstrap";
import "./Filter.css";
const Filter = () => {
  return (
    <div className="row justify-content-between">
      <div className="col-lg-7 d-flex filter-col">
        <Dropdown>
          <Dropdown.Toggle
            variant="outline-danger"
            className="btn-outline-danger"
            id="dropdown-basic"
          >
            Top Kol
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown>
          <Dropdown.Toggle
            variant="outline-danger"
            className="btn-outline-danger"
            id="dropdown-basic"
          >
            Most viewed
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown>
          <Dropdown.Toggle
            variant="outline-danger"
            className="btn-outline-danger"
            id="dropdown-basic"
          >
            Most followers
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown>
          <Dropdown.Toggle
            variant="outline-danger"
            className="btn-outline-danger"
            id="dropdown-basic"
          >
            Streams
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="col-lg-2 ml-auto">hello</div>
    </div>
  );
};

export default Filter;
