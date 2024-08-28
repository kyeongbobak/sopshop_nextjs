import Image from "next/image";
import logoImage from "../../../../public/img/Logo-SopShop.png";
import TabBtnMenu from "../../../components/TabBtnMenu/TabBtnMenu";
import styles from "./login.module.css";

export default async function login() {
  return (
    <div className={styles.wrapper}>
      <Image className={styles.logoImage} src={logoImage} />
      <TabBtnMenu></TabBtnMenu>
      <form className={styles.loginForm}>
        <label className="a11y-hidden" htmlFor="id">
          아이디
        </label>
        <input className={styles.styledInput} type="text" placeholder="아이디" />
        <label className="a11y-hidden" htmlFor="userName">
          비밀번호
        </label>
        <input className={styles.styledInput} type="password" placeholder="비밀번호" />
        <button className={styles.LoginBtn} type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
