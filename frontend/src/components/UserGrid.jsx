import { Grid, Flex, Spinner, Text } from '@chakra-ui/react';
import UserCard from './UserCard';
import { useEffect, useState } from 'react';

const UserGrid = ({users, setUsers}) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await fetch("http://127.0.0.1:5000/api/friends")
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error);
                }
                setUsers(data);

            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
        getUsers();
    }, [setUsers]);
    return (
        <>
            <Grid templateColumns={{
                base:"1fr",
                md:"repeat(2,1fr)",
                lg:"repeat(3,1fr)",

            }}>
                {users.map((user) =>(
                <UserCard key={user.id} user={user}  />

                ))}
            </Grid>

            {isLoading && (
                <Flex justifyContent={"center"}>
                    <Spinner size="x1"/>
                </Flex>
            )}

            {!isLoading && users.length === 0 && (
                <Flex justifyContent={"center"}>
                    <Text fontSize={"x1"}>
                        <Text as={"span"} fontSize={"2x1"} fontWeight={"bold"} mr={2}>
                            Kkakt
                        </Text>
                            Nu ai prieteni putoiule! 
                    </Text>
                </Flex>
            )}

        </>
    );
}
export default UserGrid