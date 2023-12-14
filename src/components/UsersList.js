// Import necessary functions and components from other files
import { fetchUsers, addUser } from "../store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import UserListItem from "./UserListItem";
import useThunk from "../hooks/useThunk";
import Skeleton from "./Skeleton";
import Button from './Button';





// Define the UsersList component
function UsersList() {
    // Use the Redux dispatch function

    // Define state variables for loading users and any errors that occur
    const [doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers);
    const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser);

    // Get the current state of the users from the Redux store
    const { data } = useSelector((state => {
        return state.users;
    }));

    // Use the useEffect hook to dispatch the fetchUsers action when the component mounts
    useEffect(() => {
        doFetchUsers();
    }, [doFetchUsers]); // Run the effect only when the dispatch function changes

    // Define a function to handle adding a user
    const handleUserAdd = () => {
        doCreateUser();
    };

    let content;


    // If the users are still loading, display a skeleton component
    if (isLoadingUsers) {
        content= <Skeleton times={4} className='h-10 w-full' />
    }else if(loadingUsersError) {
        content= <div>Error fetching data.</div>
    }else{
        content= data.map((user) => {
            return <UserListItem key={user.id} user={user}/>
            
        })
    }

    // Map over the users data and create a div for each user


    // Return the main component, which includes a button to add a user and the list of users
    return (
        <div>
            <div className="flex flex-row justify-between m-3 items-center">
                <h1 className="m-2 text-xl">
                    Users
                </h1>


                <Button primary onClick={handleUserAdd} loading={isCreatingUser}>
                    + Add Users
                </Button>

                {creatingUserError && "Error creating user"}
            </div>
            {content}
        </div>
    )
}

// Export the UsersList component
export default UsersList;