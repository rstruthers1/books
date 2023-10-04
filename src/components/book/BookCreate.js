import {useState} from "react";
import {useDispatch} from "react-redux";
import {createBook} from "../../features/book/bookSlice";
import {Col, Container, Form, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";

const initialFormValues = {
    title: '',
    author: ''
}

const BookCreate = () => {
    const [formValues, setFormValues] = useState(initialFormValues);

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
                console.log(response);
                setFormValues(initialFormValues)
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
                                          value={formValues.title}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="bookAuthor">
                            <Form.Label>Author</Form.Label>
                            <Form.Control type="text" placeholder="Enter book author" onChange={handleChange}
                                          name="author"
                                          value={formValues.author}/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Create
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default BookCreate;
