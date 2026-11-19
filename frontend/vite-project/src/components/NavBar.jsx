
import React, { useContext, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Search } from "lucide-react";
import { PlaceMenuContext } from "../context/PlaceClickedContextProvider";
import { useNavigate } from "react-router-dom";
import logo from "../media/logo.png";

const NavBar = ({
  navLikeClicked,
  setNavLikeClicked,
  coffeePlaces,
  onSearch,
  setSearchBtnClicked,
  setCoffeePlaces,
  searchVal,
  setSearchVal,
}) => {
  const { user } = useContext(PlaceMenuContext);

  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const closeMenu = () => {
    setExpanded(false);
  };

  const navHomeClick = () => {
    setNavLikeClicked(false);
    navigate("/");
    closeMenu();
  };

  const navLikeClick = () => {
    setNavLikeClicked(true);
    navigate("/liked-places");
    closeMenu();
  };

  const navAccountClick = () => {
    navigate(user ? "/user/sign-in" : "/user/sign-up");
    closeMenu();
  };

  const navAddLocationClick = () => {
    navigate("/new/add-location");
    closeMenu();
  };

  const handleSearch = (e) => {
    e.preventDefault();

    onSearch(searchVal);
    setSearchBtnClicked(searchVal.trim() !== "");

    closeMenu();
  };

  const handleSearchBarChange = (e) => {
    const value = e.target.value;

    setSearchVal(value);
    onSearch(value);
    setSearchBtnClicked(false);
  };

  const loginTooltip = (message) => (
    <Tooltip>{message}</Tooltip>
  );

  return (
    <Navbar
      expand="lg"
      expanded={expanded}
      onToggle={(nextExpanded) => setExpanded(nextExpanded)}
      className="bg-body-tertiary navbar-wrapper"
    >
      <Container fluid className="navbar-container">

        {/* Logo */}
        <Navbar.Brand
          onClick={navHomeClick}
          className="logo-wrapper"
          style={{ cursor: "pointer" }}
        >
          <img
            src={logo}
            alt="Coffee Places"
            className="logo"
            height={75}
            width={100}
          />
        </Navbar.Brand>

        {/* Hamburger toggle - desktop/tablet */}
        <Navbar.Toggle
          aria-controls="navbarScroll"
          aria-label="Toggle navigation"
        />

        <Navbar.Collapse
          id="navbarScroll"
          className="navbar-searchtabs"
        >

          {/* Search bar */}
          <Form
            className="d-flex searchbar mx-auto"
            onSubmit={handleSearch}
          >
            <Form.Control
              type="search"
              placeholder="Search for places"
              className="me-2 searchBar"
              aria-label="Search"
              value={searchVal}
              onChange={handleSearchBarChange}
            />

            <div
              type="submit"
              className="search-submit-btn"
              aria-label="Search"
            >
              <Search size={26} strokeWidth={1.75} />
            </div>
          </Form>

          {/* Navigation options */}
          <Nav className="navbar-righttabs my-2 my-lg-0">

            {/* Home */}
            <Nav.Link
              className="navbar-righttabs-icons"
              onClick={navHomeClick}
            >
              <svg width="20" height="20" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span>Home</span>
            </Nav.Link>

            {/* Liked Places */}
            <OverlayTrigger
              placement="bottom"
              overlay={
                !user
                  ? loginTooltip("Sign in to check Liked Places")
                  : <></>
              }
            >
              <Nav.Link
                className="navbar-righttabs-icons navbar-liked-icon"
                onClick={user ? navLikeClick : navAccountClick}
              >
                <svg width="20" height="20" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                <span>Liked</span>
              </Nav.Link>
            </OverlayTrigger>

            {/* Add Location */}
            <OverlayTrigger
              placement="bottom"
              overlay={
                !user
                  ? loginTooltip("Sign in to add a location")
                  : <></>
              }
            >
              <Nav.Link
                className="navbar-righttabs-icons"
                onClick={user ? navAddLocationClick : navAccountClick}
              >
                <svg width="20" height="20" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="16" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
                <span>Add Location</span>
              </Nav.Link>
            </OverlayTrigger>

            {/* Account */}
            <Nav.Link
              className="navbar-righttabs-icons"
              onClick={navAccountClick}
            >
              <svg width="20" height="20" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>{user ? user : "Account"}</span>
            </Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
