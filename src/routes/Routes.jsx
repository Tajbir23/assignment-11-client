import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import App from "../App";
import Authentication from "../pages/Authentication";



const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <h1>Error</h1>,
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