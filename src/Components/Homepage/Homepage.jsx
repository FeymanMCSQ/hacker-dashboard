import styles from "./Homepage.module.css";
import HomeNavbar from "./HomeNavbar";
import { useEffect, useState } from "react";
import Overlay from "./Overlay";
import { v4 as uuidv4 } from "uuid";

const Homepage = () => {
  const [istakingInput, setTakingInput] = useState(false);
  const [isWorkAdded, setWorkAdded] = useState(false);

  const [workspaceInfo, setWorkSpaceInfo] = useState({
    RepoName: "",
    GithubLink: "",
    Description: "",
    userEmail: "",
    time: "",
    status: "",
    Workid: "",
  });
  const [workspaceArray, setWorkSpaceArray] = useState([]);

  useEffect(() => {
    if (workspaceInfo.time != "") {
      setWorkAdded(true);
    }
  }, [workspaceInfo]);

  useEffect(() => {
    if (isWorkAdded) {
      console.log(workspaceInfo);
      setWorkSpaceArray((prevWorkSpace) => [...prevWorkSpace, workspaceInfo]);
      setTakingInput(false);
      setWorkSpaceInfo({
        ...workspaceInfo,
        RepoName: "",
        GithubLink: "",
        Description: "",
        userEmail: "",
        time: "",
        status: "",
        Workid: "",
      });
      setWorkAdded(false);
    }
  }, [isWorkAdded, workspaceInfo]);

  const changeWorkInfo = (e) => {
    console.log("Checkmate: ", workspaceInfo);
    const { name, value } = e.target;
    setWorkSpaceInfo({
      ...workspaceInfo,
      [name]: value,
    });
  };
  const openForm = () => {
    setTakingInput(true);
  };

  const closeForm = (e) => {
    e.preventDefault();
    setTakingInput(false);
  };

  const createWorkspaceFunc = (e) => {
    e.preventDefault();
    setWorkSpaceInfo((prevWorkSpace) => ({
      ...prevWorkSpace,
      status: "Just Opened",
      time: Date.now(),
      Workid: uuidv4(),
    }));
  };
  return (
    <>
      {istakingInput && (
        <Overlay
          createWorkspaceFunc={createWorkspaceFunc}
          changeWorkInfo={changeWorkInfo}
          closeForm={closeForm}
        />
      )}

      <div className={styles.mainBox}>
        <HomeNavbar changeTakingInput={openForm} />
        <div>
          <div className={styles.projectHeader}> Current Projects</div>
          <div className={styles.HeadLine}></div>
          <div className={styles.workSpaceBox}>
            {workspaceArray
              .filter((workspaceInfo) => workspaceInfo.status !== "Completed")
              .map((workspaceInfo) => (
                <div
                  key={workspaceArray.Workid}
                  className={styles.workSpaceTab}
                >
                  <div className={styles.WorkRepoName}>
                    {workspaceInfo.RepoName}
                  </div>
                  <div className={styles.HeadLine}></div>
                  <button className={styles.OpenWorkSpace}>Open</button>
                  <button className={styles.DeleteWorkSpace}>Delete</button>
                </div>
              ))}
          </div>
          <div className={styles.projectHeader}> Finished Projects</div>
          <div className={styles.HeadLine}></div>
          <div className={styles.workSpaceBox}>
            {workspaceArray
              .filter((workspaceInfo) => workspaceInfo.status === "Completed")
              .map((workspaceInfo) => (
                <div
                  key={workspaceArray.Workid}
                  className={styles.workSpaceTab}
                >
                  <div className={styles.WorkRepoName}>
                    {workspaceInfo.RepoName}
                  </div>
                  <div className={styles.HeadLine}></div>
                  <button className={styles.OpenWorkSpace}>Open</button>
                  <button className={styles.DeleteWorkSpace}>Delete</button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
