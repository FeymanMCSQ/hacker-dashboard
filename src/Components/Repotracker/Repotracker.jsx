import { useEffect, useState } from "react";
import styles from "./Repotracker.module.css";
import { Octokit } from "octokit";

const Repotracker = () => {
  const [repo, setRepo] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const octokit = new Octokit({
        auth: import.meta.env.VITE_GITHUB_TOKEN,
      });

      try {
        const result = await octokit.request(
          "GET /repos/{owner}/{repo}/commits",
          {
            owner: "FeymanMCSQ",
            repo: "hacker-dashboard",
            headers: {
              "X-GitHub-Api-Version": "2022-11-28",
            },
          }
        );
        setRepo(result);
        console.log(result.data["0"].commit.message);
        console.log(result.data["0"].author.login);
        console.log(result.data["0"].commit.author.date);
        console.log(result.data["0"].node_id);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  if (!repo || !repo.data) {
    return <div>Loading...</div>; // Show loading state if repo or data is not ready
  }

  return (
    <div className={styles.Repo}>
      <div className={styles.RepoHeader}>Github Repotracker</div>
      <div className={styles.line}></div>
      <div className={styles.bigList}>
        {repo.data.map((repos) => (
          <div key={repos.node_id}>
            <div className={styles.listItem}>
              <div className={styles.listCard}>
                Author: {repos.author.login}
              </div>
              <div className={styles.listCard}>
                Message: {repos.commit.message}
              </div>
              <div className={styles.listCard}>
                Time: {repos.commit.author.date}
              </div>
            </div>
            <div className={styles.line}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Repotracker;
