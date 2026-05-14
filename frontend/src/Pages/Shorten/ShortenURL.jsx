import React, { useEffect, useState } from 'react'
import { Button, Stack, TextInput, Text , Paper , ActionIcon } from '@mantine/core';
import { IconCopy } from "@tabler/icons-react";
import Service from '../../utils/http';
import QRCode from "react-qr-code";

export const ShortenURL = () => {
    const service = new Service();
    const [data, setData] = useState({});
    const [shortUrl, setShortUrl] = useState("");
    const handleSubmit = async () => {
        try {
            // console.log(data);
            const response = await service.post("s", data);
            console.log(response);
            setShortUrl(`https://url-shortener-bootcamp.onrender.com/api/s/${response.shortCode}`);
        } catch (error) {
            console.error("POST API call failed!", error.message);
        }
    }
    const handleCopy = async () => {
        await navigator.clipboard.writeText(shortUrl);
    };
    useEffect(() => {
        console.log(`Short URL is ${shortUrl}`);
    }, [shortUrl])
    return (
        <>
            {shortUrl && shortUrl.length > 0 ? 
            <Stack align="center" gap="xl" mt={100}>
                 <Text
                     fz="50"
                     lh="50px"
                     fw="lighter"
                     style={{
                         textShadow: "2px 2px 10px rgba(0, 0, 0, 0.69)",
                     }}
                     >
                     Shorten Your URL Here
                </Text>
                <Text fw={700} fz={20}>
                    Generated Short URL
                </Text>
                <TextInput
                    value={shortUrl}
                    readOnly
                    w="50rem"
                    size="xl"
                    radius="md"
                    rightSection={
                    <ActionIcon
                        color="pink"
                        variant="light"
                        size="lg"
                        onClick={handleCopy}
                    >
                        <IconCopy size={22} />
                    </ActionIcon>
                    }
                />
                <Paper p="md" shadow="md" radius="md">
                    <QRCode
                    value={shortUrl}
                    size={200}
                    />
                </Paper>
            </Stack>
            :
            <Stack align="center" gap="xl" mt={100}>
                 <Text
                     fz="50"
                     lh="50px"
                     fw="lighter"
                     style={{
                         textShadow: "2px 2px 10px rgba(0, 0, 0, 0.69)",
                     }}
                     >
                     Shorten Your URL Here
                </Text>
                <Stack w="25rem">
                    <TextInput
                        size="md"
                        label="Original URL"
                        withAsterisk
                        onChange={(event) => {
                            setData({ ...data, originalUrl: event.target.value });
                            console.log(data);
                        }}
                        placeholder="Enter original URL"
                        />
                    <TextInput
                        size="md"
                        label="Customize your link ( Optional )"
                        withAsterisk
                        onChange={(event) => {
                            setData({ ...data, shortCode: event.target.value });
                            console.log(data);
                        }}
                        placeholder="Customize your link"
                        />
                    <TextInput
                        size="md"
                        label="Title ( Optional )"
                        withAsterisk
                        onChange={(event) => {
                            setData({ ...data, title: event.target.value });
                            console.log(data);
                        }}
                        placeholder="Enter the Title"
                        />
                    <Button variant="outline" size="md"
                        onClick={handleSubmit}
                        >
                        Create Short URL
                    </Button>
                </Stack>
            </Stack>
            }
        </>
    )
}
export default ShortenURL