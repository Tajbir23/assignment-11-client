import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import App from "../App";
import Authentication from "../pages/Authentication";
import ErrorPage from "../pages/ErrorPage";
import CategoryBook from "../pages/CategoryBook";
import AddBook from "../pages/AddBook";
import PrivateRoute from "./PrivateRoute";
import Details from "../pages/Details";



const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: '/authentication',
                element: <Authentication />
            },
            {
                path: '/category_books/:id',
                element: <PrivateRoute><CategoryBook /></PrivateRoute>
            },
            {
                path: '/add_book',
                element: <PrivateRoute><AddBook /></PrivateRoute>
            },
            {
                path: '/details/:id',
                element: <PrivateRoute><Details/></PrivateRoute>
            }
        ]
    }
])

export default router;