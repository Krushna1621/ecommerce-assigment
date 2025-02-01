import {
  Anchor,
  Divider,
  Flex,
  Image,
  Burger,
  Drawer,
  Group,
  Menu,
  MenuItem,
  Box,
} from "@mantine/core";
import { useState, useEffect } from "react";
import LogoImage from "../../assets/images/ecommerce-logo.png";
import { IconShoppingCartFilled } from "@tabler/icons-react";
import { useGlobalPagesContext } from "../../pages/Context/Global.Context";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [opened, setOpened] = useState(false); // Track drawer visibility
  const { cartItem, user } = useGlobalPagesContext();
  const cartCount = cartItem.length;
  const navigate = useNavigate(); // Hook to navigate to other pages

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
    navigate("/");
  };
  const handleCartClick = () => {
    // Navigate to the cart page
    navigate("/cart");
    setOpened(false);
  };

  return (
    <>
      <header>
        <Flex
          align={"center"}
          justify={"space-between"}
          px={{ base: 30, md: 100 }}
          h={100}
          bg={"#f8f9fa"}
        >
          <Anchor href="/">
            <Flex>
              <Image src={LogoImage} alt="logo" w={300} h={50} />
            </Flex>
          </Anchor>

          {/* Burger menu for mobile */}
          <Burger
            display={{ base: "block", md: "none" }}
            opened={opened}
            onClick={() => setOpened((prev) => !prev)}
            size="sm"
            color="black"
            className="burger-menu"
          />

          {/* Navigation links for desktop */}
          <Flex
            align={"center"}
            gap={10}
            display={{ base: "none", md: "flex" }}
          >
            <Anchor href="/">Home</Anchor>
            <Anchor href="/products">Products</Anchor>

            {/* Conditionally render SignUp/Login or user email */}
            {!user?.email ? (
              <>
                <Anchor href="/signup">SignUp</Anchor>
                <Anchor href="/login">Login</Anchor>
              </>
            ) : (
              // Display user email as a clickable div/span
              <Menu
                width={200}
                position="bottom-end"
                transition="pop-top-right"
              >
                <Menu.Target>
                  <div style={{ cursor: "pointer" }}>{user.email}</div>
                </Menu.Target>

                <Menu.Dropdown>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu.Dropdown>
              </Menu>
            )}

            {/* Cart */}
            <Anchor href="/cart" style={{ position: "relative" }}>
              <IconShoppingCartFilled />
              {cartCount > 0 && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    backgroundColor: "red",
                    color: "white",
                    borderRadius: "50%",
                    width: "18px",
                    height: "18px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "12px",
                  }}
                >
                  {cartCount}
                </div>
              )}
            </Anchor>
          </Flex>
        </Flex>

        {/* Mobile Drawer for Navigation */}
        <Drawer
          opened={opened}
          onClose={() => setOpened(false)}
          padding="xl"
          size="100%"
          position="right"
          classNames={{ title: "drawer-title" }}
        >
          {/* Cart in mobile drawer, placed between the Burger and Logo */}
          <Flex direction="column" gap="md">
            <Anchor
              onClick={handleCartClick}
              style={{ position: "relative", cursor: "pointer" }}
            >
              <IconShoppingCartFilled />
              {cartCount > 0 && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    backgroundColor: "red",
                    color: "white",
                    borderRadius: "50%",
                    width: "18px",
                    height: "18px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "12px",
                  }}
                >
                  {cartCount}
                </div>
              )}
            </Anchor>

            <Anchor href="/" onClick={() => setOpened(false)}>
              Home
            </Anchor>
            <Anchor href="/products" onClick={() => setOpened(false)}>
              Products
            </Anchor>

            {!user?.email ? (
              <>
                <Anchor href="/signup" onClick={() => setOpened(false)}>
                  SignUp
                </Anchor>
                <Anchor href="/login" onClick={() => setOpened(false)}>
                  Login
                </Anchor>
              </>
            ) : (
              <Anchor onClick={() => setOpened(false)}>{user.email}</Anchor>
            )}
          </Flex>
        </Drawer>

        <Divider />
      </header>
    </>
  );
};

export default NavBar;
