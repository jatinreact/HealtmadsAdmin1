import { Switch, Route, Redirect } from "react-router-dom";
import React from "react";
import "./App.css";
import Home from "../src/Components/Home/Home";
import AdminLogin from "./Components/AdminLogin/AdminLogin";
import UserData from "./Components/UserData/UserData";
import FeaturedBrand from "./Components/FeaturedBrand/FeaturedBrand";
import Addmore from "./Components/Addmore/Addmore";
import ProductList from "./Components/AddProduct/ProductList";
import EmailVerify from "./Components/AdminLogin/EmailVerify";
import Resetpassword from "./Components/AdminLogin/Resetpassword";
import AddProduct from "./Components/AddProduct/AddProduct";
import AddBanner from "./Components/AddBanner/AddBanner";
import OrderStatus from "./Components/OrderStatus/OrderStatus";
import PaymentDetails from "./Components/PaymentDetails/PaymentDetails";
import PaymentGatway from "./Components/PaymentGatway/PaymentGatway";
import Catagories from "./Components/Catagories/Catagories";
import SubCatagories from "./Components/Catagories/SubCatagories";
import Brand from "./Components/Catagories/Brand";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

import ProtectedRoute from "./Components/utils/ProtectedRoute";

function App() {
  return (
    <>
      <ReactNotification />
      <Switch>
        <Route exact path="/" component={AdminLogin} />
        <Route exact path="/emailverify" component={EmailVerify} />
        <Route exact path="/resetpassword" component={Resetpassword} />
        {/* ProtectedRoute */}

        <ProtectedRoute exact path="/home" component={Home} />
        <ProtectedRoute exact path="/userdata" component={UserData} />
        <ProtectedRoute exact path="/featuredBrand" component={FeaturedBrand} />
        <ProtectedRoute exact path="/addmore" component={Addmore} />
        <ProtectedRoute exact path="/productList" component={ProductList} />
        <ProtectedRoute exact path="/addproduct" component={AddProduct} />
        <ProtectedRoute exact path="/addBanner" component={AddBanner} />
        <ProtectedRoute exact path="/orderstatus" component={OrderStatus} />
        <ProtectedRoute exact path="/payment" component={PaymentDetails} />
        <ProtectedRoute exact path="/gatway" component={PaymentGatway} />
        <ProtectedRoute exact path="/catagories" component={Catagories} />
        <ProtectedRoute exact path="/SubCatagories" component={SubCatagories} />
        <ProtectedRoute exact path="/brand" component={Brand} />
      </Switch>
    </>
  );
}

export default App;
