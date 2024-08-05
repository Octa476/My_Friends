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
    useDisclosure} from '@chakra-ui/react';
import {BiAddToQueue} from "react-icons/bi";
const CreateUserModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
     <>
        <Button onClick={(onOpen)}>
            <BiAddToQueue size={20}/>
        </Button>
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            >
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>
                My new BFF ≽^•⩊•^≼
            </ModalHeader>
            <ModalCloseButton />
                <ModalBody pb={6}>
                    
                        {/*Left*/}
                        <FormControl>
                            <FormLabel>Full name</FormLabel>
                            <Input placeholder="John PlsNo" />
                        </FormControl>
                        {/*Right*/}
                        <FormControl>
                            <FormLabel>Role</FormLabel>
                            <Input placeholder="Solftware engineer 😵" />
                        </FormControl>
        
                        <FormControl mt={4}>
                            <FormLabel>Description</FormLabel>
                            <Textarea
                            resize={"none"}
                            overflowY={"hidden"}
                            placeholder="I'm tired of this 💩 gradma"
                            />
                        </FormControl>
                        <FormControl mt={4}>
                        <RadioGroup defaultValue='male' mt={4}>
                            <Flex gap={5}>
                                <Radio value='male'>Male</Radio>
                                <Radio value='female'>Female</Radio>
                            </Flex>
                        </RadioGroup>
                        </FormControl>
                
                </ModalBody>
                <ModalFooter>
            <Button colorScheme='blue' nr={5} mr={5}>
                Add
            </Button>
            <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
        </ModalContent>
    
        </Modal>
    </>
    );
};
export default CreateUserModal;