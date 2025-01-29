import {
  Badge,
  Button,
  Card,
  Flex,
  Grid,
  Group,
  Image,
  Text,
  Title,
} from "@mantine/core";
import React, { useEffect } from "react";
import ProductCard from "../../components/Card/ProductCard";

const Products = () => {
  const [products, setProducts] = React.useState([]);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setProducts(json));
  }, []);
  return (
    <>
      <Text m={50} fw={600}>
        Product Listing page
      </Text>
      <Grid mx={50}>
        {products.map((product) => (
          <Grid.Col span={{ xs: 12, sm: 6, md: 4 }}>
            <ProductCard key={product.id} product={product} />
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
};

export default Products;
