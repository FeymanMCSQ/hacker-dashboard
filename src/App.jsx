import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SignUp from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import Navbar from "./Components/Navbar/Navbar";
import Dashboard from "./Components/Dashboard/Dashboard";
import Homepage from "./Components/Homepage/Homepage";

function App() {
  const [count, setCount] = useState(0);

  return <Homepage />;
}

export default App;
