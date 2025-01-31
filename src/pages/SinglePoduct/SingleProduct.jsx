import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Image, Text, Badge, Group, Title, Loader } from "@mantine/core";

const SingleProduct = () => {
  const { id } = useParams(); // Extract id from URL params
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

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
    return <Loader size="lg" color="blue" />;
  }

  if (!product) {
    return <Text color="red">Failed to load product details.</Text>;
  }

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image src={product?.image} alt={product.title} height={300} />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Title order={3}>{product.title}</Title>
        <Badge color="green" size="lg">
          ${product.price}
        </Badge>
      </Group>

      <Text size="sm" color="dimmed" mt="sm">
        {product.description}
      </Text>

      <Group position="apart" mt="md">
        <Badge color="blue" variant="light">
          Category: {product.category}
        </Badge>
        <Badge color="yellow" variant="light">
          Rating: {product.rating.rate} ({product.rating.count} reviews)
        </Badge>
      </Group>
    </Card>
  );
};

export default SingleProduct;
