import { RouteObject, createBrowserRouter } from "react-router-dom";
import { Signin } from "./modules/Auth/Signin/Signin";
import React from "react";
import { Signup } from "./modules/Auth/Signup/Signup";

const routes: RouteObject[] = [
    {
        path: '/signin',
        element: <Signin />
    },
    {
        path: '/signup',
        element: <Signup />
    }
];

export const router = createBrowserRouter(routes);