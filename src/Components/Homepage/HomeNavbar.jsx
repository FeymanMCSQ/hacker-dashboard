import styles from "./Homepage.module.css";

const HomeNavbar = ({ changeTakingInput }) => {
  return (
    <div className={styles.homeNav}>
      <div className={styles.homeHeader}>My App</div>
      <div className={styles.homeSide}>
        <button className={styles.workSpace} onClick={changeTakingInput}>
          + Create Workspace
        </button>
        <button className={styles.homeLogin}>Login</button>
      </div>
    </div>
  );
};

export default HomeNavbar;
