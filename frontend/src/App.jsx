import Navbar from "./components/Navbar";
import Footer from './components/Footer'
import AllRoutes from "./components/Routes/AllRoutes";

export default function App() {
  return (
    <div id="container">
      <Navbar />
      <AllRoutes />
      <Footer/>
    </div>
  );
}
