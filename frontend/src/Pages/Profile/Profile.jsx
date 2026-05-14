import { useEffect, useState } from "react";
import {
  Avatar,
  Center,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import Service from "../../utils/http";

export default function Profile() {
  const [user, setUser] = useState({});

  useEffect(() => {

    const fetchUser = async () => {
      try {
        const service = new Service();

        const res = await service.get("user/me");

        setUser(res);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();

  }, []);

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
          <Text>{user._id}</Text>
        </Group>

        <Group gap={5}>
          <Text fw={700}>Account Created:</Text>
          <Text>
            {new Date(user.createdAt).toLocaleString("en-GB")}
          </Text>
        </Group>

      </Stack>
    </Center>
  );
}