import React from "react";

function Nav({ user, signOut }) {
  return (
    <nav>
      <div className="nav__container">
        <h1 className="nav__title">Firebase Auth Practice</h1>
        <div className="pfp hover">
          {user.email ? user.email[0].toUpperCase() : null}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
