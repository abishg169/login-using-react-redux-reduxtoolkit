import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import {MainRoutes} from "./routes";

export function AppRoute() {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);
    return mounted ? (
        <Router basename="/">
            <MainRoutes />
        </Router>
    ) : null
}
