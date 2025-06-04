import { Outlet } from "react-router-dom";

import css from "./Layout.module.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
// import Chat from "@/features/Chat";


function Layout() {

  return (<>
    <Header />
    <main className={css.main}>
      <Outlet />
    </main>
    <Footer />
  </>) 
}

export default Layout;