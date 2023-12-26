import ProductList from "../features/product/components/ProductList";
import NavBar from "../features/navbar/Navbar";
import Footer from "../features/common/Footer";
//import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <NavBar>
        <ProductList></ProductList>
      </NavBar>
     <Footer> </Footer>
    </div>
  );
}

export default Home;