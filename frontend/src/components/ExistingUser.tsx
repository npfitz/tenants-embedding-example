import { Button, Popover, Select } from "@mantine/core";
import { useFetch } from "@mantine/hooks";
import { useState } from "react";

export const ExistingUser = ({ setToken }) => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [opened, setOpened] = useState(false);

  const { data: usersData } = useFetch("/users");
  const { data: tenantsData } = useFetch("/tenants");

  const users = usersData?.data || [];
  const tenants = tenantsData?.data || [];

  console.log({
    users,
    tenants,
  });

  const handleLogin = async () => {
    const user = users.find((u) => u.id === parseInt(selectedUser));
    const tenant = tenants.find((t) => t.id === user.tenant_id);
    const request = await fetch("/jwt", {
      body: JSON.stringify({
        email: user.email,
        tenant: tenant ? tenant.slug : null,
      }),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    const response = await request.json();

    setToken(response.key);
    setOpened(false);
  };

  return (
    <Popover opened={opened} onClose={() => setOpened(false)}>
      <Popover.Target>
        <Button onClick={() => setOpened((v) => !v)}>Existing User</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Select
          value={selectedUser}
          onChange={setSelectedUser}
          label="User"
          data={users.map((user) => {
            const tenant = tenants.find((t) => t.id === user.tenant_id);

            return {
              value: `${user.id}`,
              label: `${user.email}${tenant ? ` - ${tenant.name}` : ""}`,
            };
          })}
        />
        <Button onClick={handleLogin} mt="0.5rem">
          Login
        </Button>
      </Popover.Dropdown>
    </Popover>
  );
};
