import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import AddSchools from "./components/AddSchools";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/add-form" element={<AddSchools />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;