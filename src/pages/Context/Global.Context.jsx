import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { createContext, use, useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";

// Create the GlobalPagesContext
const GlobalPagesContext = createContext({
  name: "Krushna",
  handleLoginSubmit: () => {},
  error: null,
  setError: () => {},
  handleSignupSubmit: () => {},
  signUpError: null,
  cartItem: [],
  handleAddToCart: () => {},
  handleRemoveFromCart: () => {},
  user: null, // New state for storing user data
  setUser: () => {}, // New function to set user data
});

// GlobalPagesProvider component
export const GlobalPagesProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [signUpError, setSignUpError] = useState(null);
  const [cartItem, setCartItem] = useState([]);
  const [user, setUser] = useState(null); // Store user info in context


  // Login function
  const handleLoginSubmit = async (values) => {
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const loggedInUser = userCredential.user;
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      setUser(loggedInUser); // Set the user in context
    
      alert("Login successful!");
    } catch (err) {
      setError(err.message);
      console.error("Error during login:", err);
    }
  };

  // Signup function
  const handleSignupSubmit = async (values) => {
    setError(null);
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      alert("Signup successful!");
    } catch (err) {
      setSignUpError(err.message);
    }
  };

  // Add to cart function
  const handleAddToCart = ({ product }) => {
    const updatedCart = [...cartItem, product];
    setCartItem(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    console.log("Added to cart:", product);
  };

  // Remove from cart function
  const handleRemoveFromCart = (productId) => {
    const updatedCart = cartItem.filter((item) => item.id !== productId);
    setCartItem(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    console.log("Removed from cart:", productId);
  };

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItem(JSON.parse(storedCart));
    }
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Set user if already logged in
    }
  }, []);

  return (
    <GlobalPagesContext.Provider
      value={{
        name: "Krushna",
        handleLoginSubmit,
        error,
        setError,
        handleSignupSubmit,
        signUpError,
        handleAddToCart,
        handleRemoveFromCart,
        cartItem,
        user, // Pass user data to context
        setUser, // Pass setUser function to context
      }}
    >
      {children}
    </GlobalPagesContext.Provider>
  );
};

// Custom hook to use the GlobalPagesContext
export const useGlobalPagesContext = () => useContext(GlobalPagesContext);
