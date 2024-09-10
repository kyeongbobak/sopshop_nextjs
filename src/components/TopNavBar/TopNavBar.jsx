"use client";

import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isLogin, userToken, userType } from "../../recoil/atoms";
import { userLogout } from "../../api/LoginOut";
import { useRouter } from "next/navigation";
import StyledLink from "next/link";
import Image from "next/image";
import logoImage from "../../../public/img/Logo-SopShop.png";
import menuBtnImage from "../../../public/img/menu_icon.png";
import shoppingBagIcon from "../../../public/img/icon-shopping-bag.png";
import styles from "./TopNavBar.module.css";

export default function TopNavBar() {
  const [hasMounted, setHasMounted] = useState(false);
  const [slideState, setSlideState] = useState(null);

  const isLoginState = useRecoilValue(isLogin);
  const setIsLogin = useSetRecoilState(isLogin);
  const token = useRecoilValue(userToken);
  const userTypeState = useRecoilValue(userType);
  const router = useRouter();

  console.log(isLoginState);
  console.log(userTypeState);

  const logoutMutation = useMutation({
    mutationFn: userLogout,
    onSuccess: () => {
      setIsLogin(false);
      localStorage.clear();
      router.push(`/accountsetup/loginout`);
    },
    onError: () => {
      console.log(error);
    },
  });

  const handleOnLogout = () => {
    logoutMutation.mutate(token);
  };

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <StyledLink href={"/"}>
        <Image className={styles.logoImage} src={logoImage} alt="Logo" priority={true} />
      </StyledLink>
      {userTypeState === "SELLER" ? (
        <>
          <ul className={styles.navBar}>
            <li>
              <button className={styles.navBtn}>
                <Image src={shoppingBagIcon} alt="shoppingBagIcon" width={24} priority={true} />
                <StyledLink href={"/"}>
                  <span>판매자 센터</span>
                </StyledLink>
              </button>
            </li>
            <li>
              {isLoginState ? (
                <button>
                  <StyledLink href={"/accountsetup/loginout"}>Logout</StyledLink>
                </button>
              ) : (
                <button>
                  <StyledLink href={"/accountsetup/loginout"}>Login</StyledLink>
                </button>
              )}
            </li>
          </ul>
        </>
      ) : (
        <>
          <ul className={styles.navBar}>
            <li>
              <StyledLink href={"/cart"}>Cart</StyledLink>
            </li>
            <li>
              <button onClick={() => setSlideState("slideIn")}>
                <Image className={styles.menuBtnImage} src={menuBtnImage} alt="menuBtnIcon" priority={true} />
              </button>
            </li>
          </ul>
          {slideState && (
            <>
              <div className={`${styles.sideMenuOverLay} ${styles[slideState]}`} onClick={() => setSlideState("slideOut")}></div>
              <div className={`${styles.sideMenu} ${styles[slideState]}`}>
                <ul className={styles.sideMenuInner}>
                  <li className={styles.sideMenuItem}>
                    {isLoginState ? (
                      <button>
                        <StyledLink href={"/accountsetup/loginout"} onClick={() => handleOnLogout()}>
                          Logout
                        </StyledLink>
                      </button>
                    ) : (
                      <button>
                        <StyledLink href={"/accountsetup/loginout"}>Login</StyledLink>
                      </button>
                    )}
                  </li>
                  <li className={styles.sideMenuItem}>
                    <button>
                      <StyledLink href={"/accountsetup/signup"}>Join</StyledLink>
                    </button>
                  </li>
                  <li className={styles.sideMenuItem}>
                    <button>
                      <StyledLink href={""}>My Page</StyledLink>
                    </button>
                  </li>
                  <li className={styles.sideMenuItem}>
                    <button>
                      <StyledLink href={""}>Order</StyledLink>
                    </button>
                  </li>
                </ul>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
