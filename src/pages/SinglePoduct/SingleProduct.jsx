import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  Image,
  Text,
  Badge,
  Group,
  Title,
  Loader,
  Button,
  Stack,
  Flex,
} from "@mantine/core";
import { useGlobalPagesContext } from "../Context/Global.Context";

const SingleProduct = () => {
  const { id } = useParams(); // Extract id from URL params
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]); // State for cart
   const { handleAddToCart } = useGlobalPagesContext();

  useEffect(() => {
    // Fetch product data by id
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

 

  if (loading) {
    return (
      <Flex align="center" justify="center" style={{ height: "100vh" }}>
        <Loader size="lg" color="blue" />
      </Flex>
    );
  }

  if (!product) {
    return <Text color="red">Failed to load product details.</Text>;
  }

  return (
    <div className="flex flex-col items-center p-4 my-4">
      <Card
        p={{ base: "md", md: "50" }}
        m={{ base: "md", md: "50" }}
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        className="w-full max-w-md md:max-w-lg lg:max-w-2xl"
      >
        <Card.Section>
          <Image
            src={product?.image}
            alt={product.title}
            height={160}
            fit="contain"
            radius="md"
            className="w-full object-contain"
          />
        </Card.Section>

        <Group position="apart" mt="md" mb="xs">
          <Title order={3} className="text-lg text-center md:text-xl">
            {product.title}
          </Title>
          <Badge color="green" size="lg">
            ${product.price}
          </Badge>
        </Group>

        <Text size="sm" c="dimmed" mt="sm" className="text-center">
          {product.description}
        </Text>

        <Group position="apart" mt="md" className="flex-wrap">
          <Badge color="blue" variant="light">
            Category: {product.category}
          </Badge>
          <Badge color="yellow" variant="light">
            Rating: {product.rating.rate} ({product.rating.count} reviews)
          </Badge>
        </Group>

        <Stack align="center" mt="xl">
          <Button
            color="blue"
            radius="md"
            size="lg"
            className="w-full max-w-sm"
            onClick={() => {
              handleAddToCart({ product });
            }}
          >
            Add to Cart
          </Button>
        </Stack>
      </Card>
    </div>
  );
};

export default SingleProduct;
