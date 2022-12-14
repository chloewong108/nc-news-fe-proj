import "./App.css";
import Header from "./components/header";
import Home from "./components/home";
import "./home.css";
import Nav from "./components/nav";
import { Routes, Route } from "react-router-dom";
import Topics from "./components/topics";
import ArticlePage from "./components/articleCard";
import { useContext } from "react";
import { UserContext } from "./context/user";
import Users from "./components/allUsers";

function App() {
  const value = useContext(UserContext);
  return (
    <div className="App">
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/topics" element={<Topics />}></Route>
        <Route path="/topics/:topic_name" element={<Topics />}></Route>
        <Route path="/articles/:article_id" element={<ArticlePage />}></Route>
        <Route
          path="/articles/:article_id/comments"
          element={<ArticlePage />}
        ></Route>
        <Route path="/users" element={<Users />}></Route>
        <Route path="*" element={<p>404: Not Found</p>}></Route>
      </Routes>
    </div>
  );
}

export default App;
