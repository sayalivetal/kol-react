import React from "react";
import { Button, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import "./Filter.css";
const Filter = () => {
  return (
    <div className="row justify-content-between border-bottom pt-3 pb-4">
      <div className="col-lg-7 d-flex filter-col">
        {/* <Dropdown>
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
        </Dropdown> */}
        <Dropdown>
          <Dropdown.Toggle
            variant="outline-danger"
            className="btn-outline-danger"
            id="dropdown-basic"
          >
            Language
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">English</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Hindi</Dropdown.Item>
            {/* <Dropdown.Item href="#/action-3">Punjabi</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Marathi</Dropdown.Item> */}
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
            <Dropdown.Item>
              <i className="bi bi-youtube youtube-icon"></i>
            </Dropdown.Item>
            <Dropdown.Item>
              <i className="bi bi-instagram"></i>
            </Dropdown.Item>
            <Dropdown.Item>
              {" "}
              <FontAwesomeIcon icon={faFacebookF} className="facebook-icon" />
            </Dropdown.Item>
            <Dropdown.Item href="#/action-3">
              <i className="bi bi-tiktok"></i>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown>
          <Dropdown.Toggle
            variant="outline-danger"
            className="btn-outline-danger"
            id="dropdown-basic"
          >
            Location
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>Punjab</Dropdown.Item>
            <Dropdown.Item>Maharashtra</Dropdown.Item>
            {/* <Dropdown.Item href="#/action-3">Punjabi</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Marathi</Dropdown.Item> */}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="col-lg-2 ml-auto">
        {" "}
        <Dropdown>
          <Dropdown.Toggle variant="" className="sort" id="dropdown-basic">
            sort By
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>followers</Dropdown.Item>
            <Dropdown.Item> Views</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default Filter;
