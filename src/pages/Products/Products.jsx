import {
  Flex,
  Grid,
  Input,
  Loader,
  Select,
  Text,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import ProductCard from "../../components/Card/ProductCard";
import { IconSearch } from "@tabler/icons-react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Function to fetch products based on category
  const fetchProducts = (category) => {
    setIsLoading(true);
    const url =
      category === "all"
        ? "https://fakestoreapi.com/products"
        : `https://fakestoreapi.com/products/category/${category}`;

    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setProducts(json);
        setFilteredProducts(json); // Initialize filteredProducts with all products
        setIsLoading(false); // Data fetching is complete
      })
      .catch(() => setIsLoading(false)); // Handle errors by stopping the loader
  };

  // Call fetchProducts when category changes
  useEffect(() => {
    fetchProducts(category);
  }, [category]);

  // Filter products based on the search term
  useEffect(() => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  return (
    <>
      <Flex
        bg={"orange"}
        mb={20}
        direction={{ base: "column", md: "column" }}
        px={50}
        py={20}
        gap={10}
      >
        <Text fz={20} fw={900}>
          Product Listing Page
        </Text>
        <Flex
          gap={10}
          justify={"space-between"}
          direction={{ base: "column", md: "row" }}
        >
          <Flex direction={{ base: "column", md: "column" }}>
            <Text>Filters:</Text>
            <Select
              data={[
                { value: "all", label: "All" },
                { value: "electronics", label: "Electronics" },
                { value: "jewelery", label: "Jewelery" },
                { value: "men's clothing", label: "Men's Clothing" },
                { value: "women's clothing", label: "Women's Clothing" },
              ]}
              label="Category"
              placeholder="Pick one"
              defaultValue="all"
              onChange={(value) => setCategory(value || "all")}
            />
          </Flex>
          <Input
            icon={<IconSearch size={16} />}
            placeholder="Search..."
            radius="md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Flex>
      </Flex>

      {isLoading ? (
        <Flex justify="center" align="center" style={{ height: "100vh" }}>
          <Loader size="lg" />
        </Flex>
      ) : filteredProducts.length > 0 ? (
        <Grid m={50}>
          {filteredProducts.map((product) => (
            <Grid.Col span={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
              <ProductCard product={product} />
            </Grid.Col>
          ))}
        </Grid>
      ) : (
        <Flex justify="center" align="center" style={{ height: "50vh" }}>
          <Text>No products found</Text>
        </Flex>
      )}
    </>
  );
};

export default Products;
