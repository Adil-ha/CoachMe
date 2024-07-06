import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Books from "../pages/books/Books";
import RequestCoaching from "../pages/RequestCoaching";
import BooksDetails from "../pages/books/BooksDetails";
import Cart from "../pages/cart/Cart";
import Order from "../pages/order/Order";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage/>,
        children:[
            {
                path: "/",
                element: <Navigate to="/homePage" />, 
            },
            {
                path: "/homePage",
                element:<HomePage/>,
               
            },
            {
                path: "/login",
                element : <Login/>,
               
            },
            {
                path: "/register",
                element : <Register/>,
              
            },
            {
                path: "/books",
                element : <Books/>,
            },
            {
                path: "/booksDetail/:id",
                element : <BooksDetails/>,
            },
            {
                path: "/requestCoaching",
                element : <RequestCoaching/>,
              
            },
            {
                path: "/cart",
                element : <Cart/>,
              
            },
            {
                path: "/order",
                element : <Order/>,
              
            }
       
        ]
    }
])

export default router