import SellerCenterHeader from "../../components/SellerCenter/SellerCenterHeader/SellerCenterHeader";
import SellerCenterSideBar from "../../components/SellerCenter/SellerCenterSideBar/SellerCenterSideBar";
import Footer from "../../components/Footer/Footer";
import "../../styles/global.css";

export const metadata = {
  title: "SopShop",
};

export default function RootLayout({ children }) {
  return (
    <div>
      <SellerCenterHeader />
      <SellerCenterSideBar />
      {children}
      <Footer />
    </div>
  );
}
