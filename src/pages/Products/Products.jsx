import {
  Badge,
  Button,
  Card,
  Flex,
  Grid,
  Group,
  Image,
  Loader,
  Text,
  Title,
} from "@mantine/core";
import React, { useEffect } from "react";
import ProductCard from "../../components/Card/ProductCard";

const Products = () => {
  const [products, setProducts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        setProducts(json);
        setIsLoading(false); // Data fetching is complete
      })
      .catch(() => setIsLoading(false)); // Handle errors by stopping the loader
  }, []);

  return (
    <>
      <Text m={50} fz={20} fw={900}>
        Product Listing Page
      </Text>
      {isLoading ? (
        <Flex justify="center" align="center" style={{ height: "100vh" }}>
          <Loader size="lg" />
        </Flex>
      ) : (
        <Grid mx={50}>
          {products.map((product) => (
            <Grid.Col span={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
              <ProductCard product={product} />
            </Grid.Col>
          ))}
        </Grid>
      )}
    </>
  );
};

export default Products;
