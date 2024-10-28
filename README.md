# SopShop_Next.js

## Next.js 마이그레이션 목적

- Next.js의 서버컴포넌트와 페이지 자동 생성 기능을 통해 프레임워크 Next.js가 라이브러리 React와 어떻게 차별화되는지 경험, 특히 라우트를 직접 정의하지 않아도 페이지가 자동으로 생성되며, 기본 404페이지와 중첩 레이아웃 기능(layout)을 통해 더 간결하게 레이아웃 구성을 지원하는 부분을 중점적으로 살펴보기
- Next.js14에서 제공되는 App Routes 기능을 통해 공지사항 조회, 작성 UI와 백엔드 기능을 통합적으로 구현하기
- Next.js의 SSR, SSG 기능을 도입하여 페이지 로딩 성능을 개선하고, SEO 최적화를 달성, 기존 React 프로젝트에서는 클라이언트 사이드 렌더링(CSR)만 사용했다면 Next.js로 마이그레이션을 통해 SEO와 퍼포먼스 향상의 효과를 확인
- Next.js의 파일 기반 라우팅과 App Directory 구조를 통해 프로젝트 폴더 구조를 더 직관적이고 일관되게 재구성하여 유지보수성 향상
- Next.js의 이미지 최적화 기능을 통해 사용자 경험을 향상

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

| **공지사항 목록 보기**                        |
| :-------------------------------------------- |
| ![공지사항 목록 보기](/public/gif/notice.gif) |

| **공지사항 등록**                                 |
| :------------------------------------------------ |
| ![공지사항 등록](/public/gif/notice-register.gif) |

- 공지사항을 성공적으로 등록하면 목록 페이지로 자동 리디렉션

## 최적화와 기능 개선

#### 1. 서버 컴포넌트와 클라이언트 컴포넌트의 최적화 전략

- Next.js의 서버 컴포넌트를 활용하여 데이터 처리와 API 호출의 효율성을 극대화, 특정 페이지에 대해 클라이언트 측에서 불필요한 데이터 요청을 줄이고, 성능 저하를 방지하기 위해 다음 같은 전략을 채택

  - 순수하게 데이터 요청만 필요한 페이지인 메인 페이지, 브랜드 메뉴, 공지사항 상세, 상품 상세, 검색 결과 페이지는 서버 렌더링을 적용하여 초기 로딩 성능을 최적화, 이를 통해 사용자가 페이지를 요청할 때, 서버에서 데이터를 미리 가져와 렌더링함으로써 보다 빠르고 효율적인 사용자 경험을 제공
  - 클라이언트 처리가 필요한 경우, `use client` 선언을 개별 컴포넌트에만 적용하여 프로젝트 성능 저하를 최소화 시킴

#### 2. API 리팩토링

API 호출 코드를 리팩토링 하여 가독성과 유지보수성을 개선, 이는 코드의 재사용성을 높이고, 새로운 기능을 추가 시, 소요되는 시간과 노력을 절감하는데 기여

- `createHeaders` 함수를 통해 인증 토큰과 콘텐츠 유형을 포함한 헤더를 일관되게 설정, 이는 API 호출 시 필요한 헤더를 통일되게 처리하여 헤더 구성을 재사용하고 코드 가독성을 높임
- 일관된 API 호출 패턴을 `lib/common-api.js`에 정의하여 API 요청의 일관성 유지, 이를 통해 API 호출의 중복 코드를 줄임
- `apiPost`, `apiGet`, `apiPut`, `apiDelete`와 같은 일반화된 함수를 사용하여 공통 로직을 중앙 집중화함으로써 코드 중복을 방지하고, 로직 수정 시, 용이성을 확보

##### 코드 예시

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

#### 3. App Routes랑 Firebase를 이용하여 공지사항 조회, 등록 기능 구현

- 서버리스 환경에서 AppRoutes를 통해 백엔드 API 공지사항 등록 기능을 구현, 안전하고 확장 가능한 방법으로 비교적 설정이 간편한 Firebase를 데이터 베이스를 선택하여 공지사항 조회, 등록 기능을 개발

#### 기술적 접근

- 클라이언트 사이드에서 직접적으로 사용할 수 없는 Public 환경변수를 고려하여, 서버 컴포넌트를 유지하면서 Firebase와 직접 통신하여 데이터를 처리할 수 있도록 도와주는 FireBase Admin SDK 사용

**FireBase Amin SDK의 장점**

- Firebase Admin SDK는 관리 권한을 가진 도구로, 서버에서만 처리함으로써 민감한 데이터를 안전하게 보호
- 클라이언트를 거치지 않고 서버에서 직접 데이터를 처리하기 때문에 데이터 전송 과정에 발생할 수 있는 지연을 최소화,
  이러한 최적화는 사용자 경험을 개선, 애플리케이션 성능을 높이는데 기여

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

#### 4. useGetOrderList hook 추가

- `useGetOrderList` 커스텀 훅은 주문 항목의 상태를 조회하고 관리하고, 결제 완료 후 주문 정보를 완료 페이지에 표시할 수 있도록 최신 주문 상태를 관리하는 커스텀 훅을 통해서 코드의 재사용성을 높이고, 데이터 관리 간소화

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

#### 4. 자동화된 에러 페이지 처리

- Next.js 14의 `notFound` 페이지를 통해 404 에러 페이지를 쉽게 구성할 수 있어, 처리 과정이 `React` 라이브러리에 비해 간소화

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

#### 6. 주문자 정보 동일 처리

![주문자 정보 동일 처리](/public/gif/duplicate-information.gif)

- `react-hook-form`의 `setValue`를 사용해 배송지 정보 필드를 채움으로써 주문자 정보가 자동 입력되도록 구성하여 사용자 경험 개선
