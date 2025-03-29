import './assets/styles/whiteTheme.css';
import './assets/styles/darkTheme.css';
import './assets/styles/whiteTheme.css';
import './assets/styles/general.css';
import './assets/styles/resetStyles.css';
import './assets/styles/aspectRatio.css';
import { createBrowserRouter, RouterProvider } from "react-router";
import { createRoot } from "react-dom/client";
import React, { lazy, Suspense } from "react";
import Login from "./page/Auth/Login/Login";
import Register from "./page/Auth/Regsiter/Register";
import { Provider } from 'react-redux';
import store from './redux/store';
import { baseName } from './data/constants';
import FullLoad from './components/general/FullLoad/FullLoad';

const Game = lazy(() => import('./layout/Game/Game'));
const Constructor = lazy(() => import('./layout/Constructor/Constructor'));
const Auth = lazy(() => import('./layout/Auth/Auth'));

const router = [
  {
    path: "/",
    element: <Suspense fallback={<FullLoad />}> <Game /> </Suspense>,
  },
  {
    path: "/constructor",
    element: <Suspense fallback={<FullLoad />}> <Constructor /> </Suspense>,
  },
  {
    path: "/auth",
    element: <Suspense fallback={<FullLoad />}> <Auth /></Suspense>,
    children: [
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
    ],
  },
];

const routerOptions = {
  basename: baseName,
};

const ROUTER = createBrowserRouter(router, routerOptions);

const element = document.getElementById("root") || document.body;

createRoot(element).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={ROUTER} />
    </Provider>
  </React.StrictMode>
);