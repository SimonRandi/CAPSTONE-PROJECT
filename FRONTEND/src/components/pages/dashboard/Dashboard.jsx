import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";
import BaseLayout from "../../layout/BaseLayout";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import NewPost from "../../newPost/NewPost";
import MyAnimals from "../../myAnimals/MyAnimals";
import { User, Plus, BookOpenText, LogOut } from "lucide-react";
import UserProfile from "../../userProfile/UserProfile";
import Button from "../../button/Button";

const Dashboard = () => {
  const [section, setSection] = useState("home");
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [user, setUser] = useState({ firstName: "", surName: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log(decoded);
        setUser({ firstName: decoded.firstName, surName: decoded.surName });
      } catch (err) {
        console.error("Token non valido:", err);
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const renderSection = () => {
    if (section === "new-post") {
      return <NewPost />;
    } else if (section === "my-posts") {
      return <MyAnimals />;
    } else {
      return (
        <div>
          <h3 className="text-center">
            <UserProfile />
          </h3>
        </div>
      );
    }
  };

  return (
    <BaseLayout>
      <div className="dashboard-container">
        <aside className="sidebar ">
          <ul>
            <li className="fs-3 icon" onClick={() => setSection("home")}>
              {" "}
              <User className="" color="green " />
            </li>
            <li className="fs-3" onClick={() => setSection("new-post")}>
              {" "}
              <Plus color="green" />
            </li>
            <li className="fs-3" onClick={() => setSection("my-posts")}>
              <BookOpenText color="green" />
            </li>
            <li onClick={handleLogout} className="logout fs-3">
              <LogOut />
            </li>
          </ul>
        </aside>
        <main className="dashboard-content">{renderSection()}</main>
      </div>
    </BaseLayout>
  );
};

export default Dashboard;
