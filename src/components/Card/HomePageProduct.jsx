import React from 'react'
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
const HomePageProduct = ({ product }) => {
  return (
    <>
      <Card shadow="sm" p="lg" radius="md" withBorder>
        <Card.Section>
          <Image
            src={product.image}
            alt={product.title}
            style={{
              width: "100%",
              height: "200px",
              objectFit: "contain",
            }}
          />
        </Card.Section>
        <Text weight={500} size="lg" mt="md" lineClamp={1}>
          {product.title}
        </Text>
        <Text size="sm" c="dimmed" mt="xs">
          ${product.price.toFixed(2)}
        </Text>
      </Card>
    </>
  );
}

export default HomePageProduct
