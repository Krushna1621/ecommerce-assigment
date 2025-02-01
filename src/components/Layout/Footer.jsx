import React from "react";
import { Container, Flex, Text, Group, Anchor, Image } from "@mantine/core";
import LogoImage from "../../assets/images/ecommerce-logo.png";
import {
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandInstagram,
} from "@tabler/icons-react";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#f8f9fa", padding: "2rem 0" }}>
      <Container size="lg">
        {/* Top Section */}
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
          wrap="wrap"
          gap="lg"
        >
          {/* Logo/Brand */}
          <a href="/">
            <Image src={LogoImage} alt="logo" w={300} h={100} />
          </a>

          {/* Links */}
          <Group spacing="xl" direction={{ base: "column", sm: "row" }}>
            <Anchor href="/products" size="sm" color="dimmed">
              Products
            </Anchor>
            <Anchor href="/cart" size="sm" color="dimmed">
              Cart
            </Anchor>
          </Group>

          {/* Social Media */}
          <Group spacing="sm">
            <Anchor href="https://facebook.com" target="_blank">
              <IconBrandFacebook size={24} />
            </Anchor>
            <Anchor href="https://twitter.com" target="_blank">
              <IconBrandTwitter size={24} />
            </Anchor>
            <Anchor href="https://instagram.com" target="_blank">
              <IconBrandInstagram size={24} />
            </Anchor>
          </Group>
        </Flex>

        {/* Bottom Section */}
        <Flex
          mt="xl"
          justify="center"
          align="center"
          direction="column"
          wrap="wrap"
          gap="sm"
        ></Flex>
      </Container>
    </footer>
  );
};

export default Footer;
