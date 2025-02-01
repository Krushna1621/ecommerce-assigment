import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  Image,
  Text,
  Button,
  Title,
  Flex,
} from "@mantine/core";
import HomePageProduct from "../../components/Card/HomePageProduct";

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // Fetch products from Fake Store API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setFeaturedProducts(data.slice(0, 6)); // Limit to the first 6 products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products/category/jewelery"
        );
        const data = await response.json();
        const formattedCategories = data.map((item, index) => ({
          id: index + 1,
          name: item.title,
          image: item.image,
        }));
        setCategories(formattedCategories.slice(0, 3)); // Limit to the first 3 categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  return (
    <Container size="lg" py="lg">
      {/* Hero Section */}
      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="space-between"
        gap="lg"
        mb="xl"
        style={{
          backgroundImage:
            "url('data:image/jpeg;base64,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')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "8px",
          height: "300px",
          padding: "2rem",
        }}
      >
        <div>
          <Title order={1} size="2.5rem" c="white">
            Welcome to Our Store
          </Title>
          <Text size="lg" c="dimmed" mt="sm">
            Shop the latest products at unbeatable prices!
          </Text>
        </div>
      </Flex>
      <Grid gutter="lg">
        {categories.map((category) => (
          <Grid.Col span={{ xs: 12, sm: 6, md: 4 }}>
            <Card key={category.id} shadow="sm" p="lg" radius="md" withBorder>
              <Card.Section>
                  <Image
                    src={category.image}
                    alt={category.name}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "contain",
                    }}
                  />
              </Card.Section>
              <Text weight={500} size="lg" mt="md" lineClamp={1}>
                {category.name}
              </Text>
            </Card>
          </Grid.Col>
        ))}
      </Grid>

      {/* Featured Products Section */}
      <Title order={2} mt="xl" mb="md">
        Featured Products
      </Title>
      <Grid gutter="lg">
        {featuredProducts.map((product) => (
          <Grid.Col key={product.id} span={{ xs: 12, sm: 6, md: 4 }}>
            <HomePageProduct product={product} />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
