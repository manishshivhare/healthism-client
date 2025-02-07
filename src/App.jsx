import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import CheckOut from "./pages/CheckOut";
import GymOwnerProfile from "./pages/OwnersProfile";
import GymClasses from "./pages/GymClasses";
function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<CheckOut />} />
        <Route path="/satvik-pandey" element={<GymOwnerProfile />} />
        <Route path="/classes" element={<GymClasses />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
