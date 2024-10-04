import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const userToken = atom({
  key: "userToken",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const isLogin = atom({
  key: "isLogin",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const userType = atom({
  key: "userType",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const cartItemCount = atom({
  key: "cartItemCount",
  default: 1,
  effects_UNSTABLE: [persistAtom],
});

export const orderType = atom({
  key: "orderType",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const userId = atom({
  key: "userId",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
