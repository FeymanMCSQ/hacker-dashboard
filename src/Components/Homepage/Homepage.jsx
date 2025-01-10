import styles from "./Homepage.module.css";
import HomeNavbar from "./HomeNavbar";
import { useEffect, useState } from "react";
import Overlay from "./Overlay";
import { v4 as uuidv4 } from "uuid";

const Homepage = ({
  setShowHomePage,
  currentEmail,
  setCurrentWorkSpace,
  setShowWorkSpace,
}) => {
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

  const extractWorkspace = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/workspaces?email=${encodeURIComponent(
          currentEmail
        )}`,
        {
          method: "GET",
          headers: { "Content-type": "application/json" },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setWorkSpaceArray(data);
        alert("Fetch successful");
        console.log("Bitch, this chicken is cold! ", data);
      } else {
        const errorData = response.json();
        alert(`Login failed cuz ${errorData.message}`);
      }
    } catch (error) {
      const errorData = response.json();
      alert(`Couldn't fetch workspaces ${errorData.message}`);
    }
  };

  useEffect(() => {
    extractWorkspace();
  }, []);

  useEffect(() => {
    if (isWorkAdded) {
      console.log(workspaceInfo);
      createWorkspaceBackend();
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

  const createWorkspaceBackend = async (e) => {
    const response = await fetch("http://localhost:3001/api/workspaceCreate", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(workspaceInfo),
    });

    if (response.ok) {
      console.log("Yeah baby, this MF is done!!!");
    } else {
      const errorData = await response.json();
      alert(`Couldn't save workspace ${errorData.message}`);
    }
  };
  const createWorkspaceFunc = (e) => {
    e.preventDefault();
    setWorkSpaceInfo((prevWorkSpace) => ({
      ...prevWorkSpace,
      userEmail: currentEmail,
      status: "Just Opened",
      time: Date.now(),
      Workid: uuidv4(),
    }));
  };

  const openWorkSpace = (Workid) => {
    setShowHomePage(false);
    setCurrentWorkSpace(Workid);
    setShowWorkSpace(true);
  };

  const deleteWorkSpace = async (Workid) => {
    console.log(Workid);
    setWorkSpaceArray((prevWorkSpace) =>
      prevWorkSpace.filter((workspaceInfo) => workspaceInfo.Workid !== Workid)
    );

    const response = await fetch("http://localhost:3001/api/workspaceDelete", {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ Workid }),
    });

    if (response.ok) {
      console.log("The task has been deleted");
    } else {
      const errorData = await response.json();
      alert(`Couldn't delete workspace ${errorData.message}`);
    }
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
                  <button
                    className={styles.OpenWorkSpace}
                    onClick={() => openWorkSpace(workspaceInfo.Workid)}
                  >
                    Open
                  </button>
                  <button
                    className={styles.DeleteWorkSpace}
                    onClick={() => deleteWorkSpace(workspaceInfo.Workid)}
                  >
                    Delete
                  </button>
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
                  <button
                    className={styles.DeleteWorkSpace}
                    onClick={() => deleteWorkSpace(workspaceInfo.Workid)}
                  >
                    Delete
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
