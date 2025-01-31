import { IconTrash } from "@tabler/icons-react";
import { useGlobalPagesContext } from "../Context/Global.Context";
import { Button, Card, Group, Image, Text, Stack, Badge, Flex } from "@mantine/core";

const CartPage = () => {
  const { cartItem, handleRemoveFromCart } = useGlobalPagesContext();

  const calculateTotal = () => {
    return cartItem.reduce((acc, item) => acc + item.price, 0).toFixed(2);
  };

  return (
    <Stack spacing="md">
      <Text size="xl" weight={700} align="center">
        Cart
      </Text>
      {cartItem.length > 0 ? (
        <>
          <Flex justify={"space-evenly"} mx={50}>
            <Flex direction={"column"} gap={10} my={50}>
              {cartItem.map((item) => (
                <Card
                  key={item.id}
                  shadow="sm"
                  padding="lg"
                  radius="md"
                  withBorder
                >
                  <Group position="apart" align="flex-start">
                    <Group>
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={80}
                        height={80}
                        radius="md"
                      />
                      <Stack spacing={4}>
                        <Text weight={600} size="md">
                          {item.title}
                        </Text>
                        <Badge color="blue">${item.price}</Badge>
                      </Stack>
                    </Group>
                    <Button
                      variant="outline"
                      color="red"
                      size="xs"
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      <IconTrash />
                    </Button>
                  </Group>
                </Card>
              ))}
            </Flex>
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
                  onClick={() => alert("Proceeding to checkout...")}
                >
                  Proceed to Checkout
                </Button>
              </Card>
            </Flex>
          </Flex>
        </>
      ) : (
        <Flex h={"500px"} justify="center" align="center">
          <Text align="center" size="lg" weight={500} >
            Your cart is empty.
          </Text>
        </Flex>
      )}
    </Stack>
  );
};

export default CartPage;
