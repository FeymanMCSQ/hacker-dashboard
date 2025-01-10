import express from "express";
import cors from "cors";
import { MongoClient, ServerApiVersion } from "mongodb";
import MongoCheck from "./mongoCheck.js";
import CheckEmail from "./checkEmail.js";
import bodyParser from "body-parser";
import EnsureCollection from "./ensureCollection.js";
import GiveInfo from "./giveInfo.js";
import CheckSignUp from "./CheckSIgnUp.js";

const PORT = process.env.PORT || 3001;

const app = express();

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const uri =
  "mongodb+srv://sssafiullahhh:dragonballsuper123@cluster0.kqdy2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let dbClient;

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    console.log("Connected successfully to MongoDB server.");
    dbClient = client;
    // Send a ping to confirm a successful connection
  } catch (error) {
    console.error("Failed to connect to MongoDB: ", error);
    process.exit(1);
  }
}

(async () => {
  await run();
  console.log("Database client is ready");
})();

app.post("/api/signup", async (req, res) => {
  try {
    //Ok, so here if the dbCLient is not a real variable
    //containing the code for the mongoClient, it throws an error.
    if (!dbClient) throw new Error("Database not initialized");

    //This bascially checks if the database HackerDash is there in the
    //cluster. If it is, then it accesses it, if not then it
    //basically makes a reference to it and if we wanna store something in that
    //databse, it stores it.
    const db = dbClient.db("HackerDash");

    //This checks if the database has a collection called user, and if it does
    //it accesses it otherwise it basically makes it into a reference
    const userCollection = db.collection("users");

    //Extracts the userData
    const userData = req.body;
    console.log(userData);

    //Extracts the email from the userData
    const { email } = userData;
    console.log(email);
    EnsureCollection(db, "users");

    if (CheckEmail(userCollection, email) === true) {
      res.status(407).json({ error: "Account already exists" });
      GiveInfo(db, "users");
      return;
    }

    const result = await userCollection.insertOne(userData);

    res.status(201).json({
      message: "User signed up successfully",
      userID: result.insertedId,
    });
  } catch (error) {
    console.error("Error in /api/signup: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/login", async (req, res) => {
  console.log("Doo bee Doo bee Doo!!!!!!!!!!!");

  try {
    if (!dbClient) throw new error("Database not initialized");

    const db = dbClient.db("HackerDash");

    const userCollection = db.collection("users");

    const userData = req.body;

    console.log("I shall be logging ze userdata: ", userData);

    const { email } = userData;
    const { password } = userData;

    // GiveInfo(db, "users");

    const result = await CheckSignUp(userCollection, email, password);
    console.log("There once was a ship that took to sea: ", result);
    if (result === 1) {
      res.status(404).json({ error: "Account doesn't exist" });
      return;
    } else if (result === 2) {
      res.status(406).json({ error: "Incorrect Password" });
      return;
    }
    res.status(201).json({
      message: `User ${email} logged in successfully`,
    });
  } catch (error) {
    console.error("Error in api/login: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/workspaces", async (req, res) => {
  const { email } = req.query;
  if (email) {
    console.log("This is the email, bitch ", email);

    try {
      if (!dbClient) throw new error("Database not initialized");

      const db = dbClient.db("HackerDash");

      const workspaceCollection = db.collection("workspaces");

      const workspaces = await workspaceCollection
        .find({ userEmail: email })
        .toArray();
      console.log("Bro, I swear Imma kill meself. ", workspaces);
      res.status(200).json(workspaces);
    } catch (error) {
      console.error("Error in api/workspaces: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(400).json({ message: "Email is required" });
  }
});

app.post("/api/workspaceCreate", async (req, res) => {
  try {
    console.log("Bonjourno, how you doin");
    if (!dbClient) throw new Error("Database not initialized");

    const db = dbClient.db("HackerDash");

    const workspaceCollection = db.collection("workspaces");

    const workspaceData = req.body;

    const result = await workspaceCollection.insertOne(workspaceData);

    res.status(201).json({
      message: "Workspace made successfully",
      workspaceID: result.insertedId,
    });
  } catch (error) {
    console.error("Error in /api/workspaceCreate: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/taskCreate", async (req, res) => {
  try {
    if (!dbClient) throw new Error("Database not initialized");

    const db = dbClient.db("HackerDash");

    const taskCollection = db.collection("tasks");

    const taskData = req.body;

    const result = await taskCollection.insertOne(taskData);

    res.status(201).json({
      message: "Task added successfully",
      taskID: result.insertedId,
    });
  } catch (error) {
    console.error("Error in /api/taskCreate: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/api/taskDelete", async (req, res) => {
  try {
    if (!dbClient) throw new Error("Database not initialized");

    const db = dbClient.db("HackerDash");

    const taskCollection = db.collection("tasks");

    const { taskId } = req.body;

    console.log("Bonjour!!! Here is the taskID: ", taskId);
    const result = await taskCollection.deleteOne({ id: taskId });

    if (result.deletedCount === 0) {
      console.log("Task not found");
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(201).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Error in /api/taskDelete: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/taskFetch", async (req, res) => {
  const { workSpace } = await req.query;

  console.log("Yo Samuraiii: ", workSpace);
  if (workSpace) {
    console.log("Take the task, bruh ", workSpace);
    try {
      if (!dbClient) throw new error("Database not initialized");

      const db = dbClient.db("HackerDash");

      const taskCollection = db.collection("tasks");

      const tasks = await taskCollection
        .find({ workSpaceId: workSpace })
        .toArray();

      console.log("Taka taka taka. ", tasks);
      res.status(201).json(tasks);
    } catch (error) {
      console.error("Error in /api/taskFetch: ", error);
      console.log("The error in the task is: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(400).json({ message: "WorkSpace required" });
  }
});

app.delete("/api/workspaceDelete", async (req, res) => {
  console.log("Muahahahahahahah, chicken fingers");
  try {
    if (!dbClient) throw new Error("Database not initialized");

    const db = dbClient.db("HackerDash");

    const workspaceCollection = db.collection("workspaces");

    const { Workid } = req.body;

    const result = await workspaceCollection.deleteOne({ Workid });

    res.status(201).json({
      message: "Workspace deleted successfully",
    });
  } catch (error) {
    console.error("Error in /api/workspaceDelete: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});
app.listen(PORT, () => {
  console.log(`Server Listening on port ${PORT}`);
});

process.on("SIGNT", async () => {
  if (dbClient) {
    await dbClient.close();
    console.log("MongoDB connection closed.");
  }

  process.exit(0);
});
