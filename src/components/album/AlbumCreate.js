import {useState} from "react";
import {Col, Container, Form, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useCreateAlbumMutation} from "../../services/jsonServerApi";


const AlbumCreate = () => {
    const [name, setName] = useState('')
    const [createAlbum, { isLoading }] = useCreateAlbumMutation();

    const handleChange = (ev) => {
        setName(ev.target.value)
    }

    function handleSubmit(ev) {
        ev.preventDefault();
        createAlbum(name);
        setName('');
    }

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col className="mx-auto col-10 col-md-8 col-lg-6">
                    <h1>Add an Album</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="albumName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter an album name" onChange={handleChange} value={name}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" disabled={isLoading}>
                            Create
                        </Button>
                        {isLoading && ' Loading...'}
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default AlbumCreate;