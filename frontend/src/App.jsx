import Navbar from "./components/Navbar";
import Footer from './components/Footer'
import AllRoutes from "./components/Routes/AllRoutes";
import TopAlert from "./components/TopAlert";

export default function App() {
  return (
    <div id="container">
      <TopAlert />
      <Navbar />
      <AllRoutes />
      <Footer/>
    </div>
  );
}
