import styles from "./Sidebar.module.css";
import { slide as Menu } from "react-burger-menu";

const Sidebar = () => {
  return (
    <Menu className={styles.menuBar}>
      <div className={styles.heading}>My App</div>
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
