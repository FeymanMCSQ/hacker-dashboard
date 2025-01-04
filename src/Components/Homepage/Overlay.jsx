import styles from "./Homepage.module.css";

const Overlay = ({ createWorkspaceFunc, changeWorkInfo, closeForm }) => {
  return (
    <div className={styles.homeOverlay}>
      <form className={styles.homeInput} onSubmit={createWorkspaceFunc}>
        <div className={styles.homeInputCard}>
          <label htmlFor="RepoName" className={styles.homeInputCardLabel}>
            Name:{" "}
          </label>
          <input
            id="RepoName"
            name="RepoName"
            type="RepoName"
            className={styles.homeInputCardInput}
            onChange={changeWorkInfo}
          ></input>
        </div>
        <div className={styles.homeInputCard}>
          <label htmlFor="GithubLink" className={styles.homeInputCardLabel}>
            Repo Link:{" "}
          </label>
          <input
            id="GithubLink"
            name="GithubLink"
            type="GithubLink"
            className={styles.homeInputCardInput2}
            onChange={changeWorkInfo}
          ></input>
        </div>
        <div className={styles.annoyingDiv}>
          <label htmlFor="Description" className={styles.homeInputCardLabel}>
            Description:
          </label>
          <textarea
            id="Description"
            name="Description"
            type="Description"
            className={styles.bigTextForm}
            onChange={changeWorkInfo}
          ></textarea>
          <div>
            <button className={styles.homeOverlaySave} type="submit">
              Save
            </button>
            <button className={styles.homeOverlayCancel} onClick={closeForm}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Overlay;
