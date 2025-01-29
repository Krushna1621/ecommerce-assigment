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

const SignupPage = () => {
  const { handleSignupSubmit, signUpError } = useGlobalPagesContext();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length >= 6 ? null : "Password must be at least 6 characters",
      confirmPassword: (value, values) =>
        value === values.password ? null : "Passwords do not match",
    },
  });

  return (
    <Container size={420} my={40}>
      <Title align="center">Create an Account</Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        {signUpError && <Alert color="red">{signUpError}</Alert>}
        <form
          onSubmit={form.onSubmit(() => {
            handleSignupSubmit(form.values);
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
          <PasswordInput
            label="Confirm Password"
            placeholder="••••••"
            mt="md"
            {...form.getInputProps("confirmPassword")}
            required
          />
          <Button fullWidth mt="xl" type="submit">
            Sign Up
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default SignupPage;
