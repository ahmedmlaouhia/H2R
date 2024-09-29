import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Signup from "./pages/insc";


function App() {


  return (
    <BrowserRouter>
      <Routes>


        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/signup" element={<Signup/>} />


        


      </Routes>
      


    </BrowserRouter>
  );
}

export default App;
