import Footer from "../../components/Footer/Footer";
import "../../styles/global.css";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({ children }) {
  return (
    <div>
      {children}
      <Footer />
    </div>
  );
}