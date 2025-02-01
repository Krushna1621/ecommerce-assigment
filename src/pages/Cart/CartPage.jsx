import { IconTrash } from "@tabler/icons-react";
import { useGlobalPagesContext } from "../Context/Global.Context";
import {
  Button,
  Card,
  Group,
  Image,
  Text,
  Stack,
  Badge,
  Flex,
} from "@mantine/core";
import { useNavigate } from "react-router";


const CartPage = () => {
  const { cartItem, handleRemoveFromCart, user } = useGlobalPagesContext();
   const navigate = useNavigate();

  // Calculate the total price of items in the cart
  const calculateTotal = () => {
    return cartItem
      .reduce((acc, item) => acc + item.product.price, 0) // Adjusted for nested `product`
      .toFixed(2);
  };

  // Handle checkout button click
  const handleCheckout = () => {
    if (!user.email) {
      navigate("/login");
    } else {
      navigate("/thank-you");
    }
  };

  return (
    <Stack spacing="md" my={50}>
      <Text size="xl" weight={700} align="center">
        Cart
      </Text>
      {cartItem.length > 0 ? (
        <>
          <Flex
            direction={{ base: "column", md: "row" }}
            justify={"space-evenly"}
            mx={50}
          >
            {/* Cart Items */}
            <Flex direction={"column"} gap={10} my={{ base: 10, md: 50 }}>
              {cartItem.map(({ product }) => (
                <Card
                  key={product.id}
                  shadow="sm"
                  padding="lg"
                  radius="md"
                  withBorder
                >
                  <Group position="apart" align="flex-start">
                    <Group>
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={80}
                        height={80}
                        radius="md"
                      />
                      <Stack spacing={4}>
                        <Text weight={600} size="md">
                          {product.title}
                        </Text>
                        <Badge color="blue">${product.price}</Badge>
                      </Stack>
                    </Group>
                    <Button
                      variant="outline"
                      color="red"
                      size="xs"
                      onClick={() => handleRemoveFromCart(product.id)}
                    >
                      <IconTrash />
                    </Button>
                  </Group>
                </Card>
              ))}
            </Flex>

            {/* Total and Checkout Section */}
            <Flex my={50}>
              <Card>
                <Group position="apart">
                  <Text size="lg" weight={600}>
                    Total:
                  </Text>
                  <Text size="lg" weight={700} color="blue">
                    ${calculateTotal()}
                  </Text>
                </Group>
                <Button
                  fullWidth
                  mt="md"
                  size="md"
                  radius="md"
                  color="blue"
                  disabled={!user.email} // Disable button if user is not logged in
                  onClick={handleCheckout} // Handle click event
                >
                  {user.email ? "Proceed to Checkout" : "Login to Checkout"}
                </Button>
              </Card>
            </Flex>
          </Flex>
        </>
      ) : (
        <Flex h={"500px"} justify="center" align="center">
          <Text align="center" size="lg" weight={500}>
            Your cart is empty.
          </Text>
        </Flex>
      )}
    </Stack>
  );
};

export default CartPage;
