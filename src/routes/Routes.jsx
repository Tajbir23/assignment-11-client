import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import App from "../App";
import Authentication from "../pages/Authentication";
import ErrorPage from "../pages/ErrorPage";
import CategoryBook from "../pages/CategoryBook";
import AddBook from "../pages/AddBook";
import PrivateRoute from "./PrivateRoute";



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
                element: <CategoryBook />
            },
            {
                path: '/add_book',
                element: <PrivateRoute><AddBook /></PrivateRoute>
            }
        ]
    }
])

export default router;