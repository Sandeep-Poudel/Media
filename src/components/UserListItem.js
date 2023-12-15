import useThunk from "../hooks/useThunk";
import { Fragment } from "react";
import { GoTrashcan } from "react-icons/go";
import { removeUser } from "../store";
import ExpandablePanel from "./ExpandablePanel";
import AlbumsList from "./AlbumsList";
import Button from "./Button";

function UserListItem({ user }) {
    const [doRemoveUser, isDeleting, error] = useThunk(removeUser);
    const handleClick = () => {
        doRemoveUser(user);
    }

    const header = <Fragment>
        <Button loading={isDeleting} onClick={handleClick} className="mr-3" >
            <GoTrashcan />
        </Button>
        {error && <div>Error deleting user.</div>}
        {user.name}
    </Fragment>
    return (
        <ExpandablePanel header={header}>
            <AlbumsList user={user} />
        </ExpandablePanel>
    )


};
export default UserListItem;