import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalOverlay,
    Radio,
    RadioGroup,
    Textarea,
    useDisclosure,
    useToast,
} from '@chakra-ui/react';
import {BiAddToQueue} from "react-icons/bi";
import { useState } from 'react';
import { BASE_URL } from '../App';

const CreateUserModal = ({ setUsers }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ isLoading, setIsLoading ] = useState(false);
    const [ inputs, setInputs ] = useState(({
        name: "",
        role: "",
        description: "",
        gender: "",
    }));
    const toast = useToast();

    const handleCreateUser = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await fetch(BASE_URL + "/friends", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputs),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error)
            }
            let mesaj;
            if(data.gender==='male')
                mesaj = `Prietenul ${data.name} a fost creat cu succes!`;
                else
                mesaj = `Prietena ${data.name} a fost creată cu succes!`;
            toast({
                status: "success",
                title: "Felicitări!",
                description: mesaj,
                duration: 2000,
                position: "top-center",
            });

            onClose();
            setUsers((prevUsers) => [...prevUsers, data]);
            setInputs({
                name: "",
                role: "",
                description: "",
                gender: "",
            })
        } catch (error) {
            toast({
                status: "error",
                title: "Ceva nu a funcționat!",
                description: error.message,
                duration: 2000,
                position: "top-center",
            });
        } finally {
            setIsLoading(false);
        }

    };

    return (
     <>
        <Button onClick={(onOpen)}>
            <BiAddToQueue size={20}/>
        </Button>
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            >
        <ModalOverlay/>
        <form onSubmit={handleCreateUser}>
            <ModalContent>
                <ModalHeader>
                    Noul meu BFF ≽^•⩊•^≼
                </ModalHeader>
                <ModalCloseButton />
                    <ModalBody pb={6}>
                        
                            {/*Left*/}
                            <FormControl>
                                <FormLabel>Nume complet</FormLabel>
                                <Input placeholder="Ion Popescu"
                                    value = {inputs.name}
                                    onChange={(e) => setInputs({...inputs, name: e.target.value})} 
                                />
                            </FormControl>
                            {/*Right*/}
                            <FormControl>
                                <FormLabel>Rol</FormLabel>
                                <Input placeholder="Inginer 😵" 
                                value = {inputs.role}
                                onChange={(e) => setInputs({...inputs, role: e.target.value})} 
                                />
                            </FormControl>
            
                            <FormControl mt={4}>
                                <FormLabel>Descriere</FormLabel>
                                <Textarea
                                resize={"none"}
                                overflowY={"hidden"}
                                placeholder="Face chestii să funcționeze"
                                value = {inputs.description}
                                onChange={(e) => setInputs({...inputs, description: e.target.value})} 
                                />
                            </FormControl>
                            <FormControl mt={4}>
                            <RadioGroup mt={4}>
                                <Flex gap={5}>
                                    <Radio value='male'
                                        onChange={(e) => setInputs({...inputs, gender: e.target.value})} 
                                    >Bărbat</Radio>
                                    <Radio value='female'
                                        onChange={(e) => setInputs({...inputs, gender: e.target.value})}
                                    >Femeie</Radio>
                                </Flex>
                            </RadioGroup>
                            </FormControl>
                    
                    </ModalBody>
                    <ModalFooter>
                <Button colorScheme='blue' nr={5} mr={5} type = "submit" isLoading={isLoading}>
                    Add
                </Button>
                <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
            </ModalContent>
        </form>
    
        </Modal>
    </>
    );
};
export default CreateUserModal;