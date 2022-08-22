import { useRoutes } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import Login from "../pages/Login";
import {About} from "../views/About";
import {Home} from "../views/Home";
import AppLayout from "../views/Layout";

export function MainRoutes() {
    const elements = useRoutes([
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/',
            element: <AppLayout />,
            children: [
                {
                    path: '',
                    element: <PrivateRoute element={Home} meta={{
                        requiresAuth: true,
                        title: 'Home'
                    }}/>
                },
                {
                    path: 'about',
                    element: <PrivateRoute element={About} meta={{
                        requiresAuth: true,
                        title: 'About'
                    }}/>
                }
            ]
        }
    ])
    return elements;
}
