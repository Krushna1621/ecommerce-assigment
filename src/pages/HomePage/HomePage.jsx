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
          backgroundImage: "url('https://via.placeholder.com/1200x400')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "8px",
          height: "300px",
          padding: "2rem",
        }}
      >
        <div>
          <Title order={1} size="2.5rem" color="white">
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
