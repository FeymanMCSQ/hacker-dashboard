import styles from "./Sidebar.module.css";
import { slide as Menu } from "react-burger-menu";

const Sidebar = ({ sideBarOpen, openSidebarfunc }) => {
  return (
    <Menu className={styles.menuBar} isOpen={sideBarOpen}>
      <div className={styles.headingApp}>
        <div className={styles.heading}>My App</div>
        <button onClick={openSidebarfunc} className={styles.button}>
          X
        </button>
      </div>

      <div className={styles.line}></div>

      <a className={styles.menuItem} href="/">
        Home
      </a>
      <div className={styles.line}></div>
      <a className={styles.menuItem} href="/salads">
        Quick Links
      </a>
      <div className={styles.line}></div>
      <a className={styles.menuItem} href="/pizzas">
        Ask AI
      </a>
      <div className={styles.line}></div>
      <a className={styles.menuItem} href="/desserts">
        Dark Mode
      </a>
    </Menu>
  );
};

export default Sidebar;
