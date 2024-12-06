import axios from "axios";

const URL = "https://cpkdfn74v2qz32wmb425milbxy0caivk.lambda-url.ap-northeast-2.on.aws";

export const Instance = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
  },
});
