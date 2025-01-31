import {
  Anchor,
  Divider,
  Flex,
  Image,
  Burger,
  Drawer,
  Group,
} from "@mantine/core";
import { useState } from "react";
import LogoImage from "../../assets/images/ecommerce-logo.jpg";
import { IconShoppingCartFilled } from "@tabler/icons-react";
import { useGlobalPagesContext } from "../../pages/Context/Global.Context";

const NavBar = () => {
  const [opened, setOpened] = useState(false); // Track drawer visibility
    const { cartItem } = useGlobalPagesContext();
    const cartCount = cartItem.length;

  return (
    <>
      <header>
        <Flex align={"center"} justify={"space-between"} mx={40}>
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

            <Anchor href="/blogs">Blogs</Anchor>
            <Anchor href="/signup">SignUp</Anchor>
            <Anchor href="/login">Login</Anchor>
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
          title="Navigation"
          classNames={{ title: "drawer-title" }}
        >
          <Group direction="column" spacing="md" align="stretch">
            <Anchor href="/" onClick={() => setOpened(false)}>
              Home
            </Anchor>
            <Anchor href="/products" onClick={() => setOpened(false)}>
              Products
            </Anchor>
            <Anchor href="/cart" onClick={() => setOpened(false)}>
              <IconShoppingCartFilled />
            </Anchor>
            <Anchor href="/login" onClick={() => setOpened(false)}>
              SignUp
            </Anchor>
            <Anchor onClick={() => setOpened(false)}>Login</Anchor>
          </Group>
        </Drawer>

        <Divider my="lg" />
      </header>
    </>
  );
};

export default NavBar;
