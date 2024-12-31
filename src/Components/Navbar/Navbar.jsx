import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";

const Navbar = ({ onCreateWorkspace, SidebarOpen }) => {
  return (
    <div className={styles.mainNavBar}>
      <div className={styles.Navbar}>
        <div className={styles.leftContainer}>
          <div className={styles.hamburgContainer} onClick={SidebarOpen}>
            <div className={styles.bar1}></div>
            <div className={styles.bar2}></div>
            <div className={styles.bar3}></div>
          </div>
          <div className={styles.myApp}>My App</div>
        </div>
        <button className={styles.button} onClick={onCreateWorkspace}>
          + Add Workspace
        </button>
      </div>
    </div>
  );
};

export default Navbar;
