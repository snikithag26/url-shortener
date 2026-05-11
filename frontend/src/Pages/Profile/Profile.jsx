import {
  Avatar,
  Center,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";

import { useSelector } from "react-redux";

export default function Profile() {

  const user = useSelector((state) => state.user);

  return (
    <Center mt={50}>
      <Stack align="center" gap="md">

        <Avatar
          src={user.avatar}
          size={120}
          radius="50%"
        />

        <Title order={1}>
          {user.name}
        </Title>

        <Text size="md">
          {user.email}
        </Text>

        <Group gap={5}>
          <Text fw={700}>User ID:</Text>
          <Text>{user.id}</Text>
        </Group>

        <Group gap={5}>
          <Text fw={700}>Account Created:</Text>
          <Text>{user.createdAt}</Text>
        </Group>

      </Stack>
    </Center>
  );
}