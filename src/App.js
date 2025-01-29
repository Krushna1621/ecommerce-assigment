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
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/products" element={<Products />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </GlobalPagesProvider>
  );
};

export default App;
