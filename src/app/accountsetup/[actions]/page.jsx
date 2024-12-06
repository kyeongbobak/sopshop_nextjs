import LoginForm from "../../../components/LoginForm/LoginForm";
import SignUpForm from "../../../components/SignUpForm/SignUpForm";
import Image from "next/image";
import StyledLink from "next/link";
import logoImage from "../../../../public/img/Logo-SopShop.png";
import styles from "./accountsetup.module.css";

export default function accountSetup({ params }) {
  console.log(params);
  return (
    <div className={styles.wrapper}>
      <StyledLink className={styles.logoImage} href={"/"}>
        <Image src={logoImage} alt="logoImage" priority={true} />
      </StyledLink>
      {params.actions === "loginout" ? <LoginForm /> : <SignUpForm />}
    </div>
  );
}
