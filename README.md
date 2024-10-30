# SopShop_Next.js

## Next.js 마이그레이션 목적

- Next.js의 서버컴포넌트와 페이지 자동 생성 기능을 통해 프레임워크 Next.js가 라이브러리 React와 어떻게 차별화되는지 경험, 특히 라우트를 직접 정의하지 않아도 페이지가 자동으로 생성되며, 기본 404페이지와 중첩 레이아웃 기능(layout)을 통해 더 간결하게 레이아웃 구성을 지원하는 부분을 중점적으로 살펴보기
- Next.js14에서 제공되는 App Routes 기능을 통해 공지사항 조회, 작성 UI와 백엔드 기능을 통합적으로 구현하기
- Next.js의 SSR, SSG 기능을 도입하여 페이지 로딩 성능을 개선하고, SEO 최적화를 달성, 기존 React 프로젝트에서는 클라이언트 사이드 렌더링(CSR)만 사용했다면 Next.js로 마이그레이션을 통해 SEO와 퍼포먼스 향상의 효과를 확인
- Next.js의 파일 기반 라우팅과 App Directory 구조를 통해 프로젝트 폴더 구조를 더 직관적이고 일관되게 재구성하여 유지보수성 향상
- Next.js의 이미지 최적화 기능을 통해 사용자 경험을 향상

## [SopShop](https://sopshop.vercel.app/)

**서비스 이용을 위한 계정** <br/>

**구매자 계정**

- ID : buyer1 <br/>
- PASSWORD : hodu0910

**판매자 계정**

- ID : seller1 <br/>
- PASSWORD : hodu0910

## 마이그레이션 기간

- 기간 : 2024년 8월 12일 ~ 2024년 10월 07일
  <br/>

## 폴더구조

- **(buyermember-layout)와 (sellermember-layout)** : Next.js `중첩 레이아웃` 기능을 활용하여 구매자와 판매자 개별 레이아웃을 효율적으로 나누었고, 이러한 접근은 각 사용자의 유형의 필요에 따라 서로 다른 구조와 디자인을 요구하였으며, 이를 명확하게 구분하기 위해 체계적인 폴더 구조를 구성
- **accountsetup** : 로그인과 회원가입 페이지를 독립적으로 분리하여 다른 레이아웃과의 의존성을 최소화, 이 구조는 사용자가 로그인이나 회원가입을 하는 동안 다른 페이지의 레이아웃과 무관하게 독립적으로 작업할 수 있도록 하여 유연성을 높임

```
└── src
    ├── api
    ├── app
        ├── (buyermember-layout)
            ├── (main)
            ├── [selected-menu]
            ├── cart
            ├── mypage
            ├── notice-detail
                ├── [notice-number]
            ├── order
            ├── order-complete
            ├── products
                ├── [product-id]
            ├── search-results
                ├── [search-keyword]
            ├── layout.js
        ├── (sellermember-layout)
            ├── dashboard
            ├── product-manage
                ├── [actions]
                    ├── [productId]
            ├── sellerproduct-create
            ├── setting
                ├── notice-setting
            ├── layout.js
        ├── accountsetup
            ├── [actions]
    ├── api
        ├── notices
    ├── layout.js
    ├── not-found.jsx
    ├── components
        ├── CartContents
        ├── CountControl
        ├── Footer
        ├── LoginForm
        ├── Modal
            ├── AlertModal
            ├── ZipCodeSearchModal
        ├── MyPageContents
        ├── Order
            ├── OrderDetails
            ├── OrderForm
            ├── OrderList
        ├── ProductDetails
        ├── ProductItem
        ├── SearchBar
        ├── SellerCenter
            ├── NoticeCreate
            ├── SellerCenterHeader
            ├── SellerCenterSideBar
            ├── SellerProductEdit
            ├── SellerProductManage
        ├── SideBar
        ├── SignUpForm
        ├── TabBtnMenu
        ├── TabTitle
        ├── TopNavBar
    ├── hook
    ├── lib
        ├── utils
        ├── common-api.js
        ├── firebase.js
        ├── Instance.jsx
    ├── recoil
    ├── styles
```

<br/>

## 추가 구현 기능

**App Routes**와 **Firebase**를 사용해 공지사항을 조회하고 등록할 수 있는 기능을 구현, 서버리스 환경에서 **Firebase**를 데이터베이스로 활용해 데이터 처리의 효율성을 높임

| **공지사항 목록 조회**                        |
| :-------------------------------------------- |
| ![공지사항 목록 보기](/public/gif/notice.gif) |

| **공지사항 등록**                                 |
| :------------------------------------------------ |
| ![공지사항 등록](/public/gif/notice-register.gif) |

- 성공적인 등록 후 자동 리디렉션을 통해 사용자 편의성을 증대시킴

### 기술적 접근

- 클라이언트 사이드에서 직접적으로 사용할 수 없는 Public 환경변수를 고려하여, 서버 컴포넌트를 유지하면서 **Firebase**와 직접 통신하여 데이터를 처리할 수 있도록 도와주는 **FireBase Admin SDK** 사용

#### **FireBase Admin SDK를 통한 데이터 처리**

이번 프로젝트에서는 클라이언트 사이드에서 직접적으로 사용할 수 없는 **public** 환경 변수를 고려하여, **Firebase**와의 안전한 통신을 위해 **Firebase Admin SDK**를 사용했습니다. 이를 통해 다음과 같은 장점을 얻었습니다.

1. **Firebase Admin SDK**는 관리 권한을 가진 도구로, 서버에서만 처리함으로써 민감한 데이터를 안전하게 보호할 수 있습니다. 이를 통해 보안성을 높이고, 데이터 유출의 위험을 최소화했습니다.
2. 클라이언트를 거치지 않고 서버에서 직접 데이터를 처리함으로써, 데이터 전송 과정에서 발생할 수 있는 지연을 최소화했습니다. 이 최적화는 사용자 경험을 개선하고, 애플리케이션 성능을 높이는데 크게 기여했습니다.

#### **환경변수 관리**

- 비공식 환경 변수 : Firebase Admin SDK를 사용하기 위해 필요한 환경 변수를 .env 파일에 저장했습니다. 이 파일은 FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY와 같은 민감함 정보가 포함되어 있습니다. 이 정보는 서버에서만 사용되며 클라이언트에게 노출되지 않도록 설정했습니다.

```javascript
import admin from "firebase-admin";

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const db = admin.firestore();
```

```javascript
Notice.js;

import { db } from "../lib/firebaseAdmin";

export const getNotices = async () => {
  const snapshot = await db.collection("notices").get();
  const notices = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return notices;
};
```

## 최적화와 기능 개선

### 1. 서버 컴포넌트와 클라이언트 컴포넌트의 최적화 전략

Next.js의 서버 컴포넌트를 활용하여 데이터 처리와 API 호출을 효율적으로 관리하고, 이를 통해 각 페이지에서 클라이언트 측에서 불필요한 데이터 요청을 줄이고, 성능 저하를 방지

- 데이터 요청만 필요한 페이지인 메인 페이지, 브랜드 메뉴, 공지사항 상세 페이지, 상품 상세, 검색 결과 페이지는 서버 렌더링을 통해 초기 로딩 성능을 최적화, 이를 통해 사용자 요청 시 서버에서 필요한 데이터를 미리 가져와 빠르고 원활한 사용자 경험을 제공
- 클라이언트 처리가 필요한 경우, 개별 컴포넌트에만 `use client` 선언하여 전반적인 성능 저하를 방지

### 2. API 리팩토링

API 호출 코드를 리팩토링 하여 가독성과 유지보수성을 높임, 이로 인해 코드의 재사용성이 증가하고, 새로운 기능을 추가할 때 소요되는 시간과 노력을 절감

- `createHeaders` 함수를 통해 인증 토큰과 콘텐츠 유형을 포함한 헤더를 일관되게 설정, 이를 통해 API 호출 시 필요한 헤더 구성을 통일하고 가독성을 높임
- API 호출 패턴을 `lib/common-api.js`에 정의해 API 요청의 일관성 유지하며, 중복 코드 최소화
- `apiPost`, `apiGet`, `apiPut`, `apiDelete`와 같은 API 함수를 사용하여 중앙 집중화된 로직 관리가 가능하도록 구현, 이로 인해 코드 중복이 줄고, 로직 수정이 용이해짐

  #### 코드 예시

  ```javascript
  import { Instance } from "./Instance";

  const createHeaders = (token, isFormData = false) => {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    if (isFormData) {
      return { headers: { ...headers, "Content-Type": "multipart/form-data" } };
    }
    return { headers };
  };

  export const apiGet = async (url, token) => {
    try {
      const config = createHeaders(token);
      const res = await Instance.get(url, config);

      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  export const apiPost = async (url, body, token, isFormData = false) => {
    try {
      const config = createHeaders(token, isFormData);
      const res = await Instance.post(url, body, config);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  export const apiDelete = async (url, token) => {
    console.log(token);
    try {
      const config = createHeaders(token);
      const res = await Instance.delete(url, config);
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  export const apiPut = async (url, body, token, isFormData = false) => {
    try {
      const config = createHeaders(token, isFormData);
      const res = await Instance.put(url, body, config);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  ```

  ```javascript
  Account.js;

  import { apiPost } from "../lib/common-api";

  // 회원가입
  export const signUp = (body) => apiPost(`api/v1/accounts/signup/`, body);

  // 계정 검증
  export const validateAccount = (userId, token) => apiPost(`api/v1/accounts/signup/valid/username/`, userId, token);

  // 사업자 등록번호 검증
  export const validateCompanyNumber = (body) => apiPost(`api/v1/accounts/signup/valid/company_registration_number/`, body);
  ```

### 3. 커스텀 훅 useGetOrderList 추가

`useGetOrderList` 커스텀 훅은 주문 항목의 상태를 조회하고 관리하고, 결제 완료 후 주문 정보를 완료 페이지에 표시할 수 있도록 최신 주문 상태를 관리하여 코드의 재사용성을 높이고, 데이터 관리를 간소화 시킴

#### 코드 예시

```javascript
import { useEffect, useState } from "react";
import { orderList } from "../api/Order";

const useGetOrderList = (token) => {
  const [orderItems, setOrderItems] = useState([]);
  const [orderItem, setOrderItem] = useState([]);
  const [productIds, setProductIds] = useState([]);
  const [productId, setProductId] = useState([]);

  const getOrderList = async () => {
    const res = await orderList(token);
    setOrderItems(res.results);
    setOrderItem(res.results.slice(0, 1));
    const orderProducts = res.results.map((i) => i.order_items).flat();
    setProductIds(orderProducts);
    setProductId(orderProducts.slice(0, 1));
  };

  useEffect(() => {
    getOrderList();
  }, [token]);
  console.log(productIds);
  return { orderItems, productIds, orderItem, productId };
};

export default useGetOrderList;
```

### 4. 자동화된 에러 페이지 처리

Next.js 14의 `notFound` 페이지를 통해 404 에러 페이지를 쉽게 구성할 수 있어, 처리 과정이 `React` 라이브러리에 비해 간소화

#### 코드 예시

```javascript
import Link from "next/link";
import styles from "./not-found.module.css";

export const metadata = {
  title: "Not Found",
};

export default function notFound(props) {
  console.log(props);
  return (
    <>
      <div className={styles.wrapper}>
        <strong className={styles.errorMessage}>페이지를 찾을 수 없습니다.</strong>
        <div className={styles.errorMessageWrapper}>
          <p className={styles.errorTypography}>페이지가 존재하지 않거나 사용할 수 없는 페이지입니다.</p>
          <p className={styles.errorTypography}>웹 주소가 올바른지 확인해주세요.</p>
        </div>
        <div className={styles.navigateBtnWrapper}>
          <Link href="/">
            <button className={styles.navigateBtn}>메인으로</button>
          </Link>
          <Link href="/dashboard">
            <button className={styles.navigateBtn}>판매자 센터로 바로가기</button>
          </Link>
        </div>
      </div>
    </>
  );
}
```

### 5. Dynamic Route을 통한 URL 매개변수 사용

Next.js 14의 App Router는 파일 시스템 기반의 Dynamic Route를 지원하여 [actions]와 같은 폴더와 파일명을 통해 URL 매개변수를 자동으로 params 객체로 전달받을 수 있어 이를 통해 params.actions 값을 활용하여 URL에 따라 <LoginForm /> 또는 <SignUpForm /> 컴포넌트를 손쉽게 조건부 렌더링 하도록 구현, 이로 인해 코드가 이전보다 더욱 간결해지고, 유지보수가 쉬워지며, 중복 코드를 줄여 전체적인 코드 품질이 향상

#### 코드 예시

```javascript
import LoginForm from "../../../components/LoginForm/LoginForm";
import SignUpForm from "../../../components/SignUpForm/SignUpForm";
import Image from "next/image";
import StyledLink from "next/link";
import logoImage from "../../../../public/img/Logo-SopShop.png";
import styles from "./accountsetup.module.css";

export default function accountSetup({ params }) {
  return (
    <div className={styles.wrapper}>
      <StyledLink className={styles.logoImage} href={"/"}>
        <Image src={logoImage} alt="logoImage" priority={true} />
      </StyledLink>
      {params.actions === "loginout" ? <LoginForm /> : <SignUpForm />}
    </div>
  );
}
```

### 6. 주문자 정보 동일 처리

![주문자 정보 동일 처리](/public/gif/duplicate-information.gif)

- `react-hook-form`의 `setValue`를 사용해 배송지 정보 필드를 채움으로써 체크 시, 주문자 정보가 자동 입력되도록하여 사용자 경험 개선
