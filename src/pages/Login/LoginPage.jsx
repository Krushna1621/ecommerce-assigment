import { useState } from "react";
import {
  Button,
  TextInput,
  PasswordInput,
  Container,
  Paper,
  Title,
  Alert,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useGlobalPagesContext } from "../Context/Global.Context";

const LoginPage = () => {
  const { handleLoginSubmit, error } = useGlobalPagesContext();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length >= 6 ? null : "Password must be at least 6 characters",
    },
  });

  return (
    <Container size={420} my={40}>
      <Title align="center">Login</Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        {error && <Alert color="red">{error}</Alert>}
        <form
          onSubmit={form.onSubmit(() => {
            handleLoginSubmit(form.values);
          })}>
          <TextInput
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps("email")}
            required
          />
          <PasswordInput
            label="Password"
            placeholder="••••••"
            mt="md"
            {...form.getInputProps("password")}
            required
          />
          <Button fullWidth mt="xl" type="submit">
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};
export default LoginPage;
