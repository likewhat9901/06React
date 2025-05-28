import { Outlet } from "react-router-dom";

import css from "./Layout.module.css";

import Talk from "../components/Chat";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chat from "@/components/Chat";




function Layout() {

  return (<>
    <Header />
    <main className={css.main}>
      <Outlet />
    </main>
    <Footer />
    {/* <Chat /> */}
  </>) 
}

export default Layout;