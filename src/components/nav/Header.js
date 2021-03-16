import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/dailyMsg_Logo.png";

function Header({ user, signOut }) {
  useEffect(() => {}, [user]);

  return (
    <div className="header">
      <div className="logo">
        <NavLink className="logo-link" to={user ? "/lists" : "/"} exact>
          <img src={logo} alt="logo" />
        </NavLink>
      </div>

      <nav className="nav">
        {user && (
          <>
            {user.attributes && (
              <>
                <div>{user.attributes.email}</div>
                <button className="logo-link" onClick={signOut}>
                  Sign Out
                </button>
              </>
            )}
          </>
        )}
        {!user && (
          <NavLink className="nav-link" to="/signin">
            Sign In
          </NavLink>
        )}
      </nav>
    </div>

    // <nav className="navbar">
    //   <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
    //     <ul className="navbar-nav mr-auto">
    //       <li className="nav-item active">
    //         <NavLink
    //           className="nav-link"
    //           to="/"
    //           exact
    //           activeStyle={activeStyle}
    //         >
    //           Home
    //         </NavLink>
    //       </li>
    //       <li className="nav-item">
    //         <NavLink className="nav-link" to="/lists" activeStyle={activeStyle}>
    //           Lists
    //         </NavLink>
    //       </li>
    //       <li className="nav-item">
    //         <NavLink
    //           className="nav-link"
    //           to="/signin"
    //           activeStyle={activeStyle}
    //         >
    //           SignIn
    //         </NavLink>
    //       </li>
    //     </ul>
    //   </div>
    //   <div className="mx-auto order-0">
    //     <NavLink className="nav-link" to="/" exact>
    //       DailyMsg
    //     </NavLink>
    //   </div>
    //   <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
    //     <ul className="navbar-nav ml-auto">
    //       <li className="nav-item">
    //         {user && (
    //           <>
    //             {user.attributes && (
    //               <>
    //                 <div>{user.attributes.email}</div>
    //                 <button onClick={signOut}>Sign Out</button>
    //               </>
    //             )}
    //           </>
    //         )}
    //       </li>
    //     </ul>
    //   </div>
    // </nav>
  );
}

export default Header;
