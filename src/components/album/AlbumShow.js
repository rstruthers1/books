import {Card} from "react-bootstrap";
import albumImage from "../../images/cd.png";
import {FaTrash} from "react-icons/fa";
import {useDeleteAlbumMutation} from "../../services/jsonServerApi";

const AlbumShow = ({album}) => {
    const [deleteAlbum, { isLoading }] = useDeleteAlbumMutation();
    function handleDeleteClicked(ev) {
        ev.preventDefault()
        deleteAlbum(album.id);
    }

    return <Card style={{width: '16rem'}} className="book-show">
         <span style={{position: "absolute", top: "2px", right: "2px"}}>
             <a href="" onClick={handleDeleteClicked} style={{marginLeft: "5px"}}>
                <FaTrash />
             </a>
         </span>
        <Card.Img src={albumImage}
        />
        <Card.Title>{album.name}</Card.Title>

    </Card>
}

export default AlbumShow;
