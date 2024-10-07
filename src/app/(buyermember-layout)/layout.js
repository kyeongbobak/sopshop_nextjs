import TopNavBar from "../../components/TopNavBar/TopNavBar";
import SideBar from "../../components/SideBar/SideBar";
import Footer from "../../components/Footer/Footer";
import "../../styles/global.css";

export const metadata = {
  title: "SopShop",
};

export default function RootLayout({ children }) {
  return (
    <div>
      <TopNavBar />
      <SideBar />
      {children}
      <Footer />
    </div>
  );
}
