import {useState} from "react";
import {useDispatch} from "react-redux";
import {createBook} from "../../features/book/bookSlice";
import {Alert, Col, Container, Form, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {LinkContainer} from "react-router-bootstrap";

const initialFormValues = {
    title: '',
    author: ''
}

const BookCreate = () => {
    const [formValues, setFormValues] = useState(initialFormValues);
    const [createDone, setCreateDone] = useState(false)

    const dispatch = useDispatch();

    const handleChange = (ev) => {
        const target = ev.currentTarget

        setFormValues({
            ...formValues,
            [target.name]: target.type === 'checkbox'
                ? target.checked
                : target.value
        })
    }

    const handleSubmit = (ev) => {
        ev.preventDefault();
        dispatch(createBook(formValues))
            .unwrap()
            .then(response => {
                setCreateDone(true)
            })
            .catch(e => {
                console.log(e);
            });
    }

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col className="mx-auto col-10 col-md-8 col-lg-6">
                    <h1 className="text-center">Add a Book</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="bookTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter book title" onChange={handleChange}
                                          name="title"
                                          disabled={createDone}
                                          value={formValues.title}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="bookAuthor">
                            <Form.Label>Author</Form.Label>
                            <Form.Control type="text" placeholder="Enter book author" onChange={handleChange}
                                          name="author"
                                          disabled={createDone}
                                          value={formValues.author}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" disabled={createDone}>
                            Create
                        </Button>
                    </Form>

                </Col>
            </Row>
            <Row className="justify-content-md-center" style={{marginTop: "20px"}}>
                <Col className="mx-auto col-10 col-md-8 col-lg-6">
                    <LinkContainer to="/books">
                        <a> Back to list</a>
                    </LinkContainer>
                </Col>
            </Row>
            <Row className="justify-content-md-center" style={{marginTop: "20px"}}>
                <Col className="mx-auto col-10 col-md-8 col-lg-6">
                    {createDone && <Alert variant='success'>Book created successfully.</Alert>}
                </Col>
            </Row>
        </Container>
    )
}

export default BookCreate;
