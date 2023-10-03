import {useState} from "react";
import {Col, Container, Form, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useCreateAlbumMutation} from "../../services/AlbumApi";

const initialFormValues = {
    name: '',
    artist: ''
}

const AlbumCreate = () => {
    const [formValues, setFormValues] = useState(initialFormValues)
    const [createAlbum, { isLoading }] = useCreateAlbumMutation();

    const handleChange = (ev) => {
        const target = ev.currentTarget

        setFormValues({
            ...formValues,
            [target.name]: target.type === 'checkbox'
                ? target.checked
                : target.value
        })
    }

    function handleSubmit(ev) {
        ev.preventDefault();
        createAlbum(formValues);
        setFormValues(initialFormValues)
    }

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col className="mx-auto col-10 col-md-8 col-lg-6">
                    <h1 className="text-center">Add an Album</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="albumName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter an album name" onChange={handleChange}
                                          name="name"
                                          value={formValues.name}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="artist">
                            <Form.Label>Artist</Form.Label>
                            <Form.Control type="text" placeholder="Enter an artist" onChange={handleChange}
                                          name="artist"
                                          value={formValues.artist}/>
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