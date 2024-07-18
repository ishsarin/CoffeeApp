import React, { useContext } from "react";
import Nav from "react-bootstrap/Nav";
import { useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { PlaceMenuContext } from "../context/PlaceClickedContextProvider";
import { useNavigate } from "react-router-dom";
const NavBar = ({ navLikeClicked, setNavLikeClicked, coffeePlaces }) => {
  const { user, setUser } = useContext(PlaceMenuContext);
  const [likedPlaces, setLikedPlaces] = useState([{}]);

  const navigate = useNavigate();

  const navHomeClick = () => {
    const path = "/";
    setNavLikeClicked(false);
    navigate(path);
  };

  const navLikeClick = async () => {
    setNavLikeClicked(!navLikeClicked);

    const result = await fetch("/api/places/liked", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likedPlaces, user }),
    });

    const data = await result.json();
    console.log(data);

    // navigate("/liked-places");
  };

  const navAccountClick = () => {
    const path = "/user/sign-up";
    navigate(path);
  };

  const navAddLocationClick = () => {
    navigate("/new/add-location");
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary navbar-wrapper">
        <Container fluid className="navbar-container">
          <Navbar.Brand href="#">COFFEE PLACE</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className="navbar-searchtabs">
            <Form className="d-flex searchbar mx-auto">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e) => setVal(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-search"
                // onClick={searchChange}
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </Form>
            <Nav
              className=" my-2 my-lg-0  navbar-righttabs"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link
                className="navbar-righttabs-icons"
                onClick={navHomeClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-home"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                Home
              </Nav.Link>
              <Nav.Link
                onClick={user ? navLikeClick : null}
                className="navbar-righttabs-icons navbar-liked-icon"
                // disabled={user ? false : true}
              >
                {!user ? (
                  <OverlayTrigger
                    placement="bottom"
                    overlay={
                      <Tooltip id="tooltip-bottom">
                        SignIn to check Liked Places
                      </Tooltip>
                    }
                  >
                    <div variant="secondary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-heart"
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                      </svg>
                      Liked
                    </div>
                  </OverlayTrigger>
                ) : (
                  <div variant="secondary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-heart"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    Liked
                  </div>
                )}
              </Nav.Link>
              <Nav.Link
                onClick={navAddLocationClick}
                className="navbar-righttabs-icons"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-plus-circle"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="16" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
                Add Location
              </Nav.Link>
              <Nav.Link
                className="navbar-righttabs-icons"
                onClick={navAccountClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-user"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                {user ? user : "Account"}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
