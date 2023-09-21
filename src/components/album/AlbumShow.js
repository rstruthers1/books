import {Card} from "react-bootstrap";
import albumImage from "../../images/book.png";

const AlbumShow = ({album}) => {
    return <Card style={{ width: '16rem'}} className="book-show" >
        <Card.Img src={albumImage}
        />
        <Card.Title>{album.name}</Card.Title>
    
    </Card>
}

export default AlbumShow;
