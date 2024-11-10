"use client";

import AuthProvider from "./authprovider.js";
import Body from "./body.js";

export default function Home() {

  return (
    <AuthProvider>
      <Body />
    </AuthProvider>
  );
}
