import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home, { Prof } from "./components/Home";
import Traditional from "./components/Traditional";
import PostRQ from "./components/PostRQ";
import PostDetailRQ from "./components/PostDetailRQ";
import PagFruits from "./components/PagFruits";
import InfiniteQueries from "./components/InfiniteQueries";
import InfinteScroll from "./components/InfinteScroll";

function App() {
  return (
    <>
      <BrowserRouter>
        <Home></Home>
        <Routes>
          <Route path="/" element={<Prof></Prof>}></Route>
          <Route path="/trad" element={<Traditional></Traditional>}></Route>
          <Route path="/rq" element={<PostRQ></PostRQ>}></Route>
          <Route path="/pag-fruits" element={<PagFruits></PagFruits>}></Route>
          <Route
            path="/rq/:postId"
            element={<PostDetailRQ></PostDetailRQ>}
          ></Route>
          <Route
            path="/infinite"
            element={<InfiniteQueries></InfiniteQueries>}
          ></Route>
          <Route
            path="/infinite-scroll"
            element={<InfinteScroll></InfinteScroll>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
