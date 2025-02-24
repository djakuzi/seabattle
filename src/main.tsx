import './assets/styles/whiteTheme.css';
import './assets/styles/darkTheme.css';
import './assets/styles/whiteTheme.css';
import './assets/styles/general.css';
import './assets/styles/resetStyles.css';
import { createBrowserRouter, RouterProvider } from "react-router";
import { createRoot } from "react-dom/client";
import React from "react";
import Game from "./layout//Game/Game";
import Auth from "./layout/Auth/Auth";
import Login from "./page/Auth/Login/Login";
import Register from "./page/Auth/Regsiter/Register";
import { Provider } from 'react-redux';
import store from './redux/store';
import { baseName } from './data/constants';
import Constructor from './layout/Constructor/Constructor';

const router = [
  {
    path: "/",
    element: <Game></Game>,
  },
  {
    path: "/constructor",
    element: <Constructor />,
  },
  {
    path: "/auth",
    element: <Auth></Auth>,
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