import {Col, Container, Row, Spinner} from "react-bootstrap";
import {useGetAlbumsQuery} from "../../services/jsonServerApi";
import AlbumList from "./AlbumList";
import ErrorPage from "../../error-page";
import LoadingSpinner from "../LoadingSpinner";

function AlbumInventory() {

    const {
        data: albums = [],
        isLoading,
        isFetching,
        isError,
        error
    } = useGetAlbumsQuery();

    if (isLoading || isFetching) {
        return <Container>
           <LoadingSpinner/>
            </Container>

    }

    if (isError) {
        console.log({error});

        return <ErrorPage/>
    }

    return (
        <Container>
            <h1>Albums</h1>
            {isLoading || isFetching ? <LoadingSpinner/> : <AlbumList albums={albums}/> }

        </Container>
    )
}

export default AlbumInventory;