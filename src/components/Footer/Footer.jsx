import StyledLink from "next/link";
import Image from "next/image";
import instaIcon from "../../../public/img/icon-insta.png";
import fbIcon from "../../../public/img/icon-fb.png";
import ytIcon from "../../../public/img/icon-yt.png";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={styles.wrapper}>
      <section className={styles.topSection}>
        <ul className={styles.navList}>
          <li>
            <StyledLink href="">회사소개</StyledLink>
          </li>
          <li>
            <StyledLink href="">이용약관</StyledLink>
          </li>
          <li>
            <StyledLink href="">개인정보처리방침</StyledLink>
          </li>
          <li>
            <StyledLink href="">전자금융거래약관</StyledLink>
          </li>
          <li>
            <StyledLink href="">청소년보호정책</StyledLink>
          </li>
          <li>
            <StyledLink href="">제휴문의</StyledLink>
          </li>
        </ul>
        <ul className={styles.IconList}>
          <StyledLink href="">
            <Image src={instaIcon} className={styles.snsIconImage} alt="instaIcon" />
          </StyledLink>
          <StyledLink href="">
            <Image src={fbIcon} className={styles.snsIconImage} alt="fbIcon" />
          </StyledLink>
          <StyledLink href="">
            <Image src={ytIcon} className={styles.snsIconImage} alt="tyIcon" />
          </StyledLink>
        </ul>
      </section>
      <section className={styles.bottomSection}>
        <strong>(주)SopShop</strong>
        <p>서울시 중구 신당동 마린 빌딩 2층</p>
        <p>사업자번호 123-1234-5678</p>
        <p>대표 박효리</p>
      </section>
    </div>
  );
}
