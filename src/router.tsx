import { RouteObject, createBrowserRouter } from "react-router-dom";
import { Signin } from "./modules/Auth/Signin/Signin";
import { Signup } from "./modules/Auth/Signup/Signup";
import { MovieList } from "./modules/Movies/MovieList/MovieList";
import { MovieEdit } from "./modules/Movies/MovieEdit/MovieEdit";
import { MovieCreate } from "./modules/Movies/MovieCreate/MovieCreate";

const routes: RouteObject[] = [
  {
    path: '/signin',
    element: <Signin />
  },
  {
    path: '/signup',
    element: <Signup />
  },
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
];

export const router = createBrowserRouter(routes);