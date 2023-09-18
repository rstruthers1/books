import AlbumShow from "./AlbumShow";
import BookShow from "../book/BookShow";


const AlbumList = ({albums}) => {

    const renderedAlbums = albums ? albums.map(album => {
        return <AlbumShow
            key={album.id}
            album={album}
        />
    }) : []

    return (
        <div className="book-list">
            {renderedAlbums}
        </div>
    )
}

export default AlbumList;
