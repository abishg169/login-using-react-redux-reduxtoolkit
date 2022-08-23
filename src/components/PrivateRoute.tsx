import React from "react";
import { Navigate } from "react-router-dom";
// import { getToken } from "../utils/preserved-storage";
import { useAppSelector } from "@/hooks";

type Props = {
    element: React.FC|React.ComponentClass
    meta?: Record<string, any>
}

const o = Object.create(null);

const PrivateRoute: React.FC<Props> = function ({
    element: Component,
    meta = o,
    ...rest
}) {
    console.log('using private route')
    const authData = useAppSelector(state => state.auth)
    const isLogin = authData.isAuthenticated;
    console.log('is logged in ', authData);

    // if (isLogin) {
    //     return <Navigate to={'/'} replace/>
    // }

    if (meta.requiresAuth) {
        console.log('loggedin required ');
        if (isLogin) {
            return <Component {...rest} />
          } else {
            console.log('is not logged in ', isLogin);
            return <Navigate to={`/login`} />
          }
    }

    return <Component {...rest} />
}

export default PrivateRoute;
