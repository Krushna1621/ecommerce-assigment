import { Button, Card, Flex, Text } from "@mantine/core";
import { useNavigate } from "react-router";

const ThankYouPage = () => {
  const navigate = useNavigate();

  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      style={{ height: "100vh", backgroundColor: "#f9f9f9", padding: "20px" }}
    >
      <Card
        shadow="lg"
        radius="md"
        padding="xl"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <Text size="xl" weight={700} align="center" color="blue" mb="lg">
          Thank You for Shopping with Us! 🎉
        </Text>
        <Text size="md" align="center" mb="xl">
          Your order has been successfully placed. We appreciate your trust in
          us and hope to see you again soon!
        </Text>
        <Button
          fullWidth
          size="md"
          radius="md"
          color="blue"
          onClick={() => navigate("/")}
        >
          Back to Home
        </Button>
      </Card>
    </Flex>
  );
};

export default ThankYouPage;
