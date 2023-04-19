import Posts from "../src/Pages/Posts/Posts";
import Post from "../src/Pages/Post/Post";
import {Route, Routes} from "react-router-dom";

const App = () =>{
  return (
    <>
    <Routes>
      <Route path = "/" element = {<Posts/>}/>
      <Route path = "/post/:id" element = {<Post/>}/>

    </Routes>

    </>
  );
};
export default App;