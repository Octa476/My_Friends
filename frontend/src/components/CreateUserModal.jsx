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
            console.log(inputs);
            toast({
                status: "success",
                title: "ESTI BAROSAN",
                description: "Ai prins japita!",
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
                title: "ESTI PROST",
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
                    My new BFF ≽^•⩊•^≼
                </ModalHeader>
                <ModalCloseButton />
                    <ModalBody pb={6}>
                        
                            {/*Left*/}
                            <FormControl>
                                <FormLabel>Full name</FormLabel>
                                <Input placeholder="John PlsNo"
                                    value = {inputs.name}
                                    onChange={(e) => setInputs({...inputs, name: e.target.value})} 
                                />
                            </FormControl>
                            {/*Right*/}
                            <FormControl>
                                <FormLabel>Role</FormLabel>
                                <Input placeholder="Solftware engineer 😵" 
                                value = {inputs.role}
                                onChange={(e) => setInputs({...inputs, role: e.target.value})} 
                                />
                            </FormControl>
            
                            <FormControl mt={4}>
                                <FormLabel>Description</FormLabel>
                                <Textarea
                                resize={"none"}
                                overflowY={"hidden"}
                                placeholder="I'm tired of this 💩 gradma"
                                value = {inputs.description}
                                onChange={(e) => setInputs({...inputs, description: e.target.value})} 
                                />
                            </FormControl>
                            <FormControl mt={4}>
                            <RadioGroup mt={4}>
                                <Flex gap={5}>
                                    <Radio value='male'
                                        onChange={(e) => setInputs({...inputs, gender: e.target.value})} 
                                    >Male</Radio>
                                    <Radio value='female'
                                        onChange={(e) => setInputs({...inputs, gender: e.target.value})}
                                    >Female</Radio>
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