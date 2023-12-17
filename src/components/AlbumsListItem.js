import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";
import { GoTrashcan } from "react-icons/go";
import { useRemoveAlbumMutation } from "../store";
import { Fragment } from "react";

function AlbumsListItem({ album }) {
    const [removeAlbum, results] = useRemoveAlbumMutation();

    const handleRemoveAlbum = () => {
        removeAlbum(album);
    }
    const header = (
        <Fragment>
            <Button onClick={handleRemoveAlbum} loading={results.isLoading}>
                <GoTrashcan />
            </Button>
            {album.title}
        </Fragment>
    )

    return (
        <ExpandablePanel key={album.id} header={header}>
            List of photos in the album.
        </ExpandablePanel>
    )


};
export default AlbumsListItem;