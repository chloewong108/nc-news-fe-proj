import "./App.css";
import Header from "./components/header";
import Home from "./components/home";
import "./home.css";
import Nav from "./components/nav";
import { Routes, Route } from "react-router-dom";
import Topics from "./components/topics";
import ArticlePage from "./components/articleCard";

function App() {
  return (
    <div className="App">
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/topics" element={<Topics />}></Route>
        <Route path="/topics/:topic_name" element={<Topics />}></Route>
        <Route path="/articles/:article_id" element={<ArticlePage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
