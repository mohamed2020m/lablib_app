import React from "react"
import NavBar from "./NavBar"
import Footer from "./Footer"
import WhyToSub from "./WhyTosub"


const Layout = ({children}) => (
    <>
        <NavBar />
        <main>{children}</main>
        <WhyToSub />
        <Footer />
    </>
);

export default Layout;
