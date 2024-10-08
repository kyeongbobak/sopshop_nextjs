"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";
import "../styles/global.css";

export default function RootLayout({ children }) {
  const queryClient = new QueryClient();

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./Ellipse 1.png" />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <RecoilRoot>{children}</RecoilRoot>
        </QueryClientProvider>
      </body>
    </html>
  );
}
