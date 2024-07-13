import { createBrowserRouter, Navigate, redirect } from "react-router-dom";
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
import Confirmation from "../components/Confirmation";
import { accountService } from "../services/accountService";
import Dashboard from "../pages/admin/Dashboard";
import AdminOrderDetail from "../pages/admin/AdminOrderDetail";
import AdminRequestCoachingDetail from "../pages/admin/AdminRequestCoachingDetail";

const currentUser = accountService.getCurrentUser(); 

const authCheck = () => {
    if (accountService.isLogged()) {
      return true;
    } else {
      return redirect("/");
    }
}

const isAdmin = () => {
    if(currentUser.role == "ROLE_ADMIN"){
        return true;
    }else {
        return redirect("/");
    }
}

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
                loader : () => authCheck(),
                
            },
            {
                path: "/booksDetail/:id",
                element : <BooksDetails/>,
                loader : () => authCheck(),
            },
            {
                path: "/requestCoaching",
                element : <RequestCoaching/>,
                loader : () => authCheck(),
                
              
            },
            {
                path: "/cart",
                element : <Cart/>,
                loader : () => authCheck(),
              
            },
            {
                path: "/order",
                element : <Order/>,
                loader : () => authCheck(),
              
            },
            {
                path: "/confirmation/:id",
                element : <Confirmation/>,
                loader : () => authCheck(),
              
            },
            {
                path: "/dashboard",
                element : <Dashboard/>,
                loader : () => isAdmin(),
              
            },
            {
                path: "/AdminOrderDetail/:id",
                element : <AdminOrderDetail/>,
                loader : () => isAdmin(),
              
            },
            {
                path: "/AdminRequestCoachingDetail/:id",
                element : <AdminRequestCoachingDetail/>,
                loader : () => isAdmin(),
              
            },

            
        ]
    }
])

export default router