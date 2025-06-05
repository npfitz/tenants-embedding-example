import { Box, Button, Popover, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useFetch } from "@mantine/hooks";
import { useState } from "react";

export const LoginModal = ({ setKey }) => {
  const { data, loading, error } = useFetch("/tenants");
  const tenants = data?.data || [];

  console.log({
    data,
    loading,
    error,
  });

  const [opened, setOpened] = useState(false);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      tenant: undefined,
    },
  });

  const handleSubmit = async (values) => {
    const request = await fetch("/jwt", {
      body: JSON.stringify(values),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    const response = await request.json();

    setKey(response.key);
    setOpened(false);
  };

  return (
    <Popover opened={opened}>
      <Popover.Target>
        <Button onClick={() => setOpened((v) => !v)}>New User</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Box>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              label="Email"
              {...form.getInputProps("email")}
            ></TextInput>
            <TextInput
              label="First Name"
              {...form.getInputProps("firstName")}
            ></TextInput>
            <TextInput
              label="Last Name"
              {...form.getInputProps("lastName")}
            ></TextInput>
            <Select
              data={tenants.map((tenant) => ({
                label: tenant.name,
                value: tenant.slug,
              }))}
              label="tenant"
              {...form.getInputProps("tenant")}
            />
            <Button type="submit" mt="0.5rem">
              Submit
            </Button>
          </form>
        </Box>
      </Popover.Dropdown>
    </Popover>
  );
};
