import React from "react";
import Swal from "sweetalert2";
import $ from "jquery";
import "./componentsStyle/sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useGlobalState } from "./GlobalStateContext";
import { withConfig } from "../Config";
import { useSwal } from "./SweetAlert";
import { useNavigate } from "react-router-dom";

var fullHeight = function () {
  $(".js-fullheight").css("height", $(window).height());
  $(window).resize(function () {
    $(".js-fullheight").css("height", $(window).height());
  });
};
fullHeight();

var toggleAside = function () {
  $("#sidebar").toggleClass("active");
  if ($(window).width() < 992) {
    $("#content").toggleClass("sidebar-content");
  } else {
    if (!$("#content").hasClass("sidebar-content")) {
      $("#content").addClass("sidebar-content");
    }
  }
  $(".inner-container").toggleClass("w-xl-90");
  $(".inner-container").toggleClass("w-xl-75");
};

var toggleMenu = function (self) {
  $(self).next().slideToggle();
};

const Sidebar = ({ config }) => {
  const { activeMenu, setActiveMenu } = useGlobalState();
  const { alert } = useSwal();
  const navigate = useNavigate();

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    $(`.components li`).removeClass("active");
    $(`#${menu}`).addClass("active");
  };

  const handleLogout = () => {
    // Tampilkan alert konfirmasi logout menggunakan SweetAlert
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You will be logged out!",
      showCancelButton: true,
      confirmButtonColor: "#ffcc00",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out!",
      background: "#1c1c1c",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Logging out...");
        sessionStorage.removeItem("token");

        // Redirect ke login page setelah logout
        console.log("Redirecting to login...");
        navigate("/login");

        // Tampilkan alert setelah logout berhasil
        Swal.fire({
          icon: "success",
          title: "Logged Out!",
          text: "You have been successfully logged out.",
          background: "#1c1c1c",
          color: "#fff",
          confirmButtonColor: "#a5dc86",
        });
      }
    });
  };

  return (
    <nav id="sidebar" className="js-fullheight">
      <div className="custom-menu">
        <button
          type="button"
          id="sidebarCollapse"
          onClick={() => toggleAside()}
          className="btn btn-primary"
        >
          <FontAwesomeIcon icon={faBars} />
          <span className="sr-only">Toggle Menu</span>
        </button>
      </div>
      <div className="ps-0 pe-0 pt-5">
        <h2>
          <a href="/cms/drama/validate" className="logo ps-4 pe-4">
            {config.short_name}
          </a>
        </h2>
        <ul className="list-unstyled components mb-5">
          <li id="Dramas" className="ps-4 pe-4">
            <a
              href="#homeSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
              onClick={(e) => toggleMenu(e.target)}
            >
              Movies
            </a>
            <ul
              className={`ms-0 ${
                activeMenu === "Validate" || activeMenu === "Input New Drama"
                  ? ""
                  : "collapse"
              } list-unstyled`}
              id="homeSubmenu"
            >
              <li
                className={`ps-3 ${activeMenu === "Validate" ? "active" : ""}`}
                onClick={() => handleMenuClick("Validate")}
              >
                <a href="/cms/drama/validate">Validate</a>
              </li>
              <li
                className={`ps-3 ${
                  activeMenu === "Input New Drama" ? "active" : ""
                }`}
                onClick={() => handleMenuClick("Input New Drama")}
              >
                <a href="/cms/drama/input">Input New Movie</a>
              </li>
            </ul>
          </li>
          <li
            id="Countries"
            className={`ps-4 pe-4 ${
              activeMenu === "Countries" ? "active" : ""
            }`}
            onClick={() => handleMenuClick("Countries")}
          >
            <a href="/cms/countries">Countries</a>
          </li>
          <li
            id="Awards"
            className={`ps-4 pe-4 ${activeMenu === "Awards" ? "active" : ""}`}
            onClick={() => handleMenuClick("Awards")}
          >
            <a href="/cms/awards">Awards</a>
          </li>
          <li
            id="Genres"
            className={`ps-4 pe-4 ${activeMenu === "Genres" ? "active" : ""}`}
            onClick={() => handleMenuClick("Genres")}
          >
            <a href="/cms/genres">Genres</a>
          </li>
          <li
            id="Actors"
            className={`ps-4 pe-4 ${activeMenu === "Actors" ? "active" : ""}`}
            onClick={() => handleMenuClick("Actors")}
          >
            <a href="/cms/actors">Actors</a>
          </li>
          <li
            id="Comments"
            className={`ps-4 pe-4 ${activeMenu === "Comments" ? "active" : ""}`}
            onClick={() => handleMenuClick("Comments")}
          >
            <a href="/cms/comments">Comments</a>
          </li>
          <li
            id="Users"
            className={`ps-4 pe-4 ${activeMenu === "Users" ? "active" : ""}`}
            onClick={() => handleMenuClick("Users")}
          >
            <a href="/cms/users">Users</a>
          </li>
          <li
            id="Logout"
            className={`ps-4 pe-4 ${activeMenu === "Logout" ? "active" : ""}`}
            onClick={() => handleMenuClick("Logout")}
          >
            <a onClick={handleLogout}>Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default withConfig(Sidebar);
