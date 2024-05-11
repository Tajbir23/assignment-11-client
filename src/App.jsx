import { Outlet } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Footer from "./pages/Footer";

function App() {
  return (
    <div>
    <Navbar />
      <div className="md:px-36 sm:px-36 px-10 lg:px-36">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
