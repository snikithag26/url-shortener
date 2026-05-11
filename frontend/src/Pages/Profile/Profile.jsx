import { Avatar, Center, Text, Title, Stack, Group } from '@mantine/core';

export default function Profile() {
  return (
    <>
      <Center mt={50}>
        <Stack align="center" gap="md">
        <Avatar size={120} />
        <Title order={1}>User name</Title>
        <Text size="md">email@gmail.com</Text>
        <Group gap={5}>
            <Text fw={700}>User ID:</Text> 
            <Text size="md">Default text</Text>
        </Group>
        <Group gap={5}>
            <Text fw={700}>Account Created:</Text> 
            <Text size="md">Default text</Text>
        </Group>
        </Stack>
      </Center>
    </>
  );
}