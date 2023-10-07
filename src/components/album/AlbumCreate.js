import {useState} from "react";
import {Alert, Col, Container, Form, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useCreateAlbumMutation} from "../../services/AlbumApi";
import {LinkContainer} from "react-router-bootstrap";

const initialFormValues = {
    name: '',
    artist: ''
}

const AlbumCreate = () => {
    const [formValues, setFormValues] = useState(initialFormValues);
    const [createAlbum, { isLoading }] = useCreateAlbumMutation();
    const [createDone, setCreateDone] = useState(false)

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
        createAlbum(formValues).unwrap()
            .then((data) => {
                setCreateDone(true)
            });
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
                                          disabled={createDone}
                                          value={formValues.name}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="artist">
                            <Form.Label>Artist</Form.Label>
                            <Form.Control type="text" placeholder="Enter an artist" onChange={handleChange}
                                          name="artist"
                                          disabled={createDone}
                                          value={formValues.artist}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" disabled={isLoading || createDone}>
                            Create
                        </Button>
                        {isLoading && ' Loading...'}
                    </Form>
                </Col>
            </Row>
            <Row className="justify-content-md-center" style={{marginTop: "20px"}}>
                <Col className="mx-auto col-10 col-md-8 col-lg-6">
                    <LinkContainer to="/albums">
                        <a> Back to list</a>
                    </LinkContainer>
                </Col>
            </Row>
            <Row className="justify-content-md-center" style={{marginTop: "20px"}}>
                <Col className="mx-auto col-10 col-md-8 col-lg-6">
                    {createDone && <Alert variant='success'>Album created successfully.</Alert>}
                </Col>
            </Row>
        </Container>
    );
}

export default AlbumCreate;