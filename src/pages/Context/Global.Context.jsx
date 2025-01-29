import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { createContext, use, useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";

const GlobalPagesContext = createContext({
  name: "Krushna",
  handleLoginSubmit: () => {},
  error: null,
  setError: () => {},
  handleSignupSubmit: () => {},
  signUpError: null,
  cartItem: [],
  handleAddToCart: () => {},
});

export const GlobalPagesProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [signUpError, setSignUpError] = useState(null);

  const [cartItem, setCartItem] = useState([]);

  //Login function
  const handleLoginSubmit = async (values) => {
    console.log(values);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      alert("Login successful!");
    } catch (err) {
      setError(err.message);
    }
  };

  //Signup function
  const handleSignupSubmit = async (values) => {
    setError(null);
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      alert("Signup successful!");
    } catch (err) {
      setSignUpError(err.message);
    }
  };

  const handleAddToCart = ({ product }) => {
    // Add product to the cart
    const updatedCart = [...cartItem, product];

    // Update state and save to localStorage
    setCartItem(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    console.log("Added to cart:", product);
  };

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItem(JSON.parse(storedCart));
    }
  }, []);

  return (
    <>
      <GlobalPagesContext.Provider
        value={{
          name: "Krushna",
          handleLoginSubmit,
          error,
          setError,
          handleSignupSubmit,
          signUpError,
          handleAddToCart,
          cartItem,
        }}>
        {children}
      </GlobalPagesContext.Provider>
      ;
    </>
  );
};

export const useGlobalPagesContext = () => use(GlobalPagesContext);
