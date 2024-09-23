import SellerProductEdit from "../../../components/SellerCenter/SellerProductEdit/SellerProductEdit";
import SellerCenterHeader from "../../../components/SellerCenter/SellerCenterHeader/SellerCenterHeader";
import SellerCenterSideBar from "../../../components/SellerCenter/SellerCenterSideBar/SellerCenterSideBar";

export default function sellerDashboard() {
  return (
    <>
      <SellerCenterHeader />
      <SellerCenterSideBar />
      <SellerProductEdit />
    </>
  );
}
