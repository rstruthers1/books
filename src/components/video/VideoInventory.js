import {Container, Row} from "react-bootstrap";
import VideoList from "./VideoList";

const videoList = JSON.parse('[\n' +
    '\t{\n' +
    '\t\t"id": 6,\n' +
    '\t\t"title": "Nightmare Before Christmas",\n' +
    '\t\t"video_type": null,\n' +
    '\t\t"image_file_name": null\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"id": 8,\n' +
    '\t\t"title": "101 Dalmations",\n' +
    '\t\t"video_type": "DVD",\n' +
    '\t\t"image_file_name": null\n' +
    '\t}\n' +
    ']')

function VideoInventory() {



    return (
        <Container>
            <h1 className="text-center">Videos</h1>
            <Row>
                <VideoList videos={videoList}/>
            </Row>
        </Container>
    )
}

export default VideoInventory;
