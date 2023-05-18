import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "../Navbar/Navbar.css"

const Navbar = ({count , setCount}) => {
  let nav = useNavigate();
 

  const forLogOut = () => {
    localStorage.clear();
    nav("/");
  };
  return (
    <div>
      <nav className="navbar navbar-expand   " style={{width:"100%"}}>
        <div className="container">
          <NavLink className="navbar-brand text-light fw-bold me-lg-5 fw-bold" to={""}>
            USERS
          </NavLink>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ms-auto ">
              <NavLink className={`nav-link text-light me-2 fw-bold `} to={"usertable"}>
                List
                <span class="cart-count m-1 badge   ">
                  {count}
                </span>
              </NavLink>
              <button
                type="button"
                className="logout-text btn btn-light  fw-bold"
                onClick={forLogOut}
              >
                Logout<i class="bi bi-box-arrow-right m-2 fw-bold"></i>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <Outlet/>
    </div>
    
  );
};

export default Navbar;
