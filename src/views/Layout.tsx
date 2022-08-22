import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/layout/Footer";

const AppLayout: React.FC = function() {
    return(
        <>
            <Outlet></Outlet>
            <Footer/>
        </>
    )
}

export default AppLayout;
