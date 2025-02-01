import "./App.css";
import "@mantine/core/styles.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { createTheme, MantineProvider } from "@mantine/core";
import NavBar from "./components/Layout/NavBar";
import LoginPage from "./pages/Login/LoginPage";
import CartPage from "./pages/Cart/CartPage";
import Products from "./pages/Products/Products";
import SignupPage from "./pages/SignUp/SignUp";
import { GlobalPagesProvider } from "./pages/Context/Global.Context";
import HomePage from "./pages/HomePage/HomePage";
import Footer from "./components/Layout/Footer";
import SingleProduct from "./pages/SinglePoduct/SingleProduct";
import ThankYouPage from "./pages/ThankYou/ThankYou";
const App = () => {
  const theme = createTheme({
    defaultRadius: "sm",
    fontFamily: "PublicSans, sans-serif",
    primaryColor: "blue",
  });
  return (
    <GlobalPagesProvider>
      <MantineProvider theme={theme}>
        <NavBar />
        
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/products" element={<Products />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/products/:id" element={<SingleProduct />} />
            <Route path="/thank-you" element={<ThankYouPage/>} />
          </Routes>
       
        <Footer />
      </MantineProvider>
    </GlobalPagesProvider>
  );
};

export default App;
