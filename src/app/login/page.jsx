import LoginForm from "../../components/LoginForm/LoginForm";
import Image from "next/image";
import StyledLink from "next/link";
import logoImage from "../../../public/img/Logo-SopShop.png";
import styles from "./login.module.css";

export default function login() {
  return (
    <div className={styles.wrapper}>
      <StyledLink className={styles.logoImage} href={"/"}>
        <Image src={logoImage} alt="logoImage" priority />
      </StyledLink>
      <LoginForm />
    </div>
  );
}
