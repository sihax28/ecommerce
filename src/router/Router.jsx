import { createBrowserRouter } from "react-router-dom"
import Error404 from "../components/pages/Error404"
import Home from "../components/pages/Home"
import Login from "../components/pages/Login"
import Products from "../components/pages/Products"
import App from "../components/templates/App"
import Register from "../components/pages/Register"

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <Error404/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: "/productos",
                element: <Products/>,
                errorElement: <Error404/>
            }
        ]
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/registro",
        element: <Register/>
    }
    
])

export default router