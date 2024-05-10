import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import App from "../App";
import Authentication from "../pages/Authentication";
import ErrorPage from "../pages/ErrorPage";



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
            }
        ]
    }
])

export default router;