import React from "react";
import "./Nav.css";

const Nav = props => (
  <nav className="nav justify-content-center">
    <ul>
      <li className="nav-item" id="logo">Click React Memory Game</li>
      <li className="nav-item" id="scores">Current Score: {props.score}  Highest Score: {props.highScore} </li>
    </ul>
  </nav>
);

export default Nav;
