import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router";

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
  const navigate = useNavigate(); 
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
      navigate("/");
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
      navigate("/login");
    } catch (err) {
      setSignUpError(err.message);
    }
  };

  // Add to cart function
  const handleAddToCart = (product) => {
    console.log(product.product.id); // Log the product ID for debugging

    // Retrieve the cart from localStorage or initialize an empty array
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the product is already in the cart using the nested structure
    const isProductInCart = cart.some(
      (item) => item.product.id === product.product.id
    );

    if (isProductInCart) {
      // Product is already in the cart
      alert("Product is already in the cart!");
    } else {
      // Product is not in the cart, add it
      const updatedCart = [...cart, product];
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save updated cart in localStorage
      setCartItem(updatedCart); // Update state with the new cart
      alert("Product added to the cart!");
    }
  };


  // Remove from cart function
  const handleRemoveFromCart = (productId) => {
    // Filter out the item with the matching product ID
    const updatedCart = cartItem.filter(
      (item) => item.product.id !== productId
    );

    // Update the cart state
    setCartItem(updatedCart);

    // Update localStorage with the new cart data
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Log the removal for debugging
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
