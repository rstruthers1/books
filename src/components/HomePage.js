import {Col, Container, Row} from "react-bootstrap";
import homeLibraryImage from "../images/library-512.png"

const HomePage = () => {
    return (<Container>
        <h1 className="text-center">Your Home Library Catalog</h1>
        <Col sm={3} className="m-auto">
        <img src={homeLibraryImage} style={{marginTop: "40px"}}/>
        </Col>
    </Container>)
}

export default HomePage;