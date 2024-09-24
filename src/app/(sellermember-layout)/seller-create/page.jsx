import SellerCenterHeader from "../../../components/SellerCenter/SellerCenterHeader/SellerCenterHeader";
import SellerCenterSideBar from "../../../components/SellerCenter/SellerCenterSideBar/SellerCenterSideBar";
import SellerProductCreate from "../../../components/SellerCenter/SellerProductCreate/SellerProductCreate";

export default function sellerCreate() {
  return (
    <>
      <SellerCenterHeader />
      <SellerCenterSideBar />
      <SellerProductCreate />
    </>
  );
}
