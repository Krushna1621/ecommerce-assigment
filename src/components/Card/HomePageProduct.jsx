import React from 'react'
import {
  Card,
  Image,
  Text,
} from "@mantine/core";
import { Link } from 'react-router';
const HomePageProduct = ({ product }) => {
  return (
    <>
      <Card shadow="sm" p="lg" radius="md" withBorder>
        <Card.Section>
          <Link to={`/products/${product.id}`}>
            <Image
              src={product.image}
              alt={product.title}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "contain",
              }}
            />
          </Link>
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
