import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SignUp from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import Navbar from "./Components/Navbar/Navbar";
import Dashboard from "./Components/Dashboard/Dashboard";
import Homepage from "./Components/Homepage/Homepage";

function App() {
  const [count, setCount] = useState("");
  const [showSignIn, setShowSignIn] = useState(false);
  const [showLogIn, setShowLogIn] = useState(true);
  const [showHomepage, setShowHomePage] = useState(false);
  const [currentEmail, setCurrentEmail] = useState("");
  const [currentWorkSpace, setCurrentWorkSpace] = useState("");
  const [showWorkSpace, setShowWorkSpace] = useState(false);

  return (
    <div>
      <div>{count}</div>
      {showSignIn && <SignUp setShowSignIn={setShowSignIn} />}
      {showLogIn && (
        <Login
          setShowLogIn={setShowLogIn}
          setLogInEmail={setCurrentEmail}
          setShowHomePage={setShowHomePage}
        />
      )}
      {showHomepage && (
        <Homepage
          setShowHomePage={setShowHomePage}
          currentEmail={currentEmail}
          setCurrentWorkSpace={setCurrentWorkSpace}
          setShowWorkSpace={setShowWorkSpace}
        />
      )}
      {showWorkSpace && <Dashboard currentWorkSpace={currentWorkSpace} />}
    </div>
  );
}

export default App;
