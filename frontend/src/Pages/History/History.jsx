import React , { useEffect, useState } from 'react'
import { Button, Modal, Table, TextInput } from '@mantine/core';
import Service from '../../utils/http';
import { useDisclosure } from '@mantine/hooks';

const History = () => {
    const service = new Service();
    const [opened, { open, close }] = useDisclosure(false);
    const [data,setData] = useState([]);
    const [updatedData, setUpdatedData] = useState({});
    const [selectedShortUrl, setSelectedShortUrl] = useState("");
    const [rows, setRows] = useState([]);
    const updateRecord = async(shortCode) => {
        try{
            const response = await service.patch(`s/${shortCode}`, updatedData);
            console.log(response);
        } catch(error){
            console.error(error.message);
        }
    }
    const handleUpdateSubmit = async() =>{
        await updateRecord(selectedShortUrl,updatedData )
        setUpdatedData({});
        close();
        fetchData();
    }
    const handleUpdate = (item) => {
        setUpdatedData(item);
        setSelectedShortUrl(item.shortCode);
        console.log('open')
        open()
    }
    

    useEffect( () =>{
        if(data && data.length > 0){
            setRows(data.map((element) => (
        <Table.Tr key={element._id}>
        <Table.Td>{element.originalUrl}</Table.Td>
        <Table.Td>{element.shortCode}</Table.Td>
        <Table.Td>{element.clickCount}</Table.Td>
        <Table.Td>{element.createdAt}</Table.Td>
        <Table.Td>{element.expiresAt}</Table.Td>
        <Table.Td>
            <Button onClick={()=>handleUpdate(element)}>Edit</Button>
        </Table.Td>
        <Table.Td>

        </Table.Td>
        </Table.Tr>
    )))
        }
    }, [data])
    const fetchData = async() => {
        try {   
            const response = await service.get('user/my/urls');
            console.log(response);
            setData(response.shortURLs)
        }
        catch(error) {
            console.log(error);
        }
    }
    
    useEffect(()=>{
        fetchData();
    },[])

    return (
        <div>
            <Table striped highlightOnHover withTableBorder withColumnBorders>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Original URL</Table.Th>
                        <Table.Th>Short Link</Table.Th>
                        <Table.Th>Clicks</Table.Th>
                        <Table.Th>Created</Table.Th>
                        <Table.Th>Expires</Table.Th>
                        <Table.Th>Actions</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
             <Modal opened={opened} onClose={close} title="Edit URL">
                <TextInput
                    defaultValue = {updatedData.originalUrl}
                    label="Edit Original URL"
                    onChange = {(event)=>{setUpdatedData({...updatedData, originalUrl:event.target.value})}}
                />
                <TextInput
                    defaultValue = {updatedData.title}
                    label="Edit Title"
                    onChange = {(event)=>{setUpdatedData({...updatedData, title:event.target.value})}}
                />
                <Button onClick={handleUpdateSubmit}>Save</Button>
             </Modal>
        </div>
    )
}

export default History
