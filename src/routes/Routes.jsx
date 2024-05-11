import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import App from "../App";
import Authentication from "../pages/Authentication";
import ErrorPage from "../pages/ErrorPage";
import CategoryBook from "../pages/CategoryBook";
import AddBook from "../pages/AddBook";
import PrivateRoute from "./PrivateRoute";
import Details from "../pages/Details";
import AllBooks from "../pages/AllBooks";



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
            },
            {
                path: '/all_books',
                element: <PrivateRoute><AllBooks /></PrivateRoute>
            }
        ]
    }
])

export default router;