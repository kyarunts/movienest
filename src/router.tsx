import { RouteObject, createBrowserRouter } from "react-router-dom";
import { Signin } from "./modules/User/Signin/Signin";
import { Signup } from "./modules/User/Signup/Signup";
import { MovieList } from "./modules/Movies/MovieList/MovieList";
import { MovieEdit } from "./modules/Movies/MovieEdit/MovieEdit";
import { MovieCreate } from "./modules/Movies/MovieCreate/MovieCreate";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { Error } from "./modules/Error/Error";

const routes: RouteObject[] = [
  {
    element: <ProtectedRoutes authRequired={false} />,
    children: [
      {
        path: '/signin',
        element: <Signin />
      },
      {
        path: '/signup',
        element: <Signup />
      }
    ]
  },
  {
    element: <ProtectedRoutes authRequired={true} />,
    children: [
      {
        path: '/',
        element: <MovieList />,
      },
      {
        path: '/movie/:id',
        element: <MovieEdit />
      },
      {
        path: '/movie',
        element: <MovieCreate />
      }
    ]
  },
  {
    path: '/error',
    element: <Error type="error" />
  },
  {
    path: '*',
    element: <Error type="notFound" />
  }
];

export const router = createBrowserRouter(routes);