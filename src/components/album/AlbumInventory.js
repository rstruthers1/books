import {Container} from "react-bootstrap";
import {useGetAlbumsQuery} from "../../services/AlbumApi";
import AlbumList from "./AlbumList";
import LoadingSpinner from "../LoadingSpinner";
import ErrorPage from "../ErrorPage";

function AlbumInventory() {

    const {
        data: albums = [],
        isLoading,
        isFetching,
        isError,
        error
    } = useGetAlbumsQuery();


    let albumListContent;
    if (isLoading || isFetching) {
        albumListContent = <LoadingSpinner/>
    } else if (isError) {
        albumListContent = <ErrorPage errorMessage={JSON.stringify(error)}/>
    } else {
        albumListContent = <AlbumList albums={albums}/>
    }


    return (
        <Container>
            <h1 className="text-center">Albums</h1>
            {albumListContent}
        </Container>
    )
}

export default AlbumInventory;