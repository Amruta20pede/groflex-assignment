
import Footer from "../features/common/Footer";
import NavBar from "../features/navbar/Navbar";
import ProductDetail from "../features/product/components/ProductDetails";

function ProductDetailPage() {
  return (
    <div>
      <NavBar>
        <ProductDetail></ProductDetail>
      </NavBar>
      <Footer></Footer>
    </div>
  );
}

export default ProductDetailPage;