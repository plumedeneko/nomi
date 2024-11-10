"use client";

import Image from "next/image";
import Login from "./login.js"
import Register from "./register.js"
import MainContent from "./maincontent.js";
import QRScan from "./qrscan.js";
import GetInfo from "./getinfo.js";
import { useAuth } from "./authprovider.js";
import { useState } from "react";

export default function Body() {
  
  const { isAuthenticated } = useAuth();
  const [page, setPage] = useState(isAuthenticated ? 3 : 1);

  let component;
  if (page == 1)
    component = <Login setPage={setPage} />
  else if (page == 2)
    component = <Register setPage={setPage} />
  else if (page == 3)
    component = <MainContent setPage={setPage} />
  else if (page == 4)
    component = <QRScan setPage={setPage} />
  else if (page == 5)
    component = <GetInfo setPage={setPage} />

  return component;
}
