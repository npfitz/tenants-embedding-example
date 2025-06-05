import "./App.css";
import { AppShell, Flex } from "@mantine/core";
import { LoginModal } from "./components/LoginModal";
import { useState } from "react";
import { EmbeddedMetbase } from "./components/EmbeddedMetabase";
import { ExistingUser } from "./components/ExistingUser";

function App() {
  const [token, setToken] = useState(null);

  return (
    <AppShell header={{ height: 60 }} padding="md" w="100%">
      <AppShell.Header px="1rem">
        <Flex gap="1rem" h="100%" align="center">
          <LoginModal setKey={setToken} />
          <ExistingUser setToken={setToken} />
        </Flex>
      </AppShell.Header>

      <AppShell.Main
        h="100%"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <EmbeddedMetbase token={token} />
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
