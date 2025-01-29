import {
  Badge,
  Button,
  Card,
  Flex,
  Group,
  Image,
  Text,
  Title,
} from "@mantine/core";
import { use } from "react";
import { useGlobalPagesContext } from "../../pages/Context/Global.Context";

const ProductCard = ({ product }) => {
  const { handleAddToCart } = useGlobalPagesContext();
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{ height: 400, cursor: "pointer" }}>
      <Flex align={"center"} justify={"center"}>
        <Image
          src={product.image}
          alt={product.title}
          height={160}
          fit="contain"
        />
      </Flex>

      <Group position="apart" mt="md" mb="xs">
        <Title order={5} style={{ fontSize: "16px" }}>
          {product.title}
        </Title>
      </Group>

      <Text size="sm" lineClamp={3}>
        {product.description}
      </Text>

      <Flex justify="space-between" align="center" mt="md">
        <Text weight={700}>${product.price}</Text>
        <Badge color="yellow">
          Rating: {product.rating.rate} ({product.rating.count} reviews)
        </Badge>
      </Flex>

      <Button
        fullWidth
        variant="light"
        color="teal"
        mt="lg"
        onClick={() => {
          handleAddToCart({ product });
        }}>
        Add to Cart
      </Button>
    </Card>
  );
};

export default ProductCard;
