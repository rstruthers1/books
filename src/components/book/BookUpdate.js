import {useEffect, useState} from "react";
import {Col, Container, Form, Row, Image} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchBook,
    getBookLoading
} from "../../features/oneBook/oneBookSlice";
import {updateBook} from "../../features/book/bookSlice";

const initialFormValues = {
    title: '',
    author: ''
}

const BookUpdate = () => {
    const [formValues, setFormValues] = useState(initialFormValues)
    const params = useParams();
    const dispatch = useDispatch();

    const loading = useSelector(getBookLoading)

    useEffect(() => {

        dispatch(fetchBook(params.id)).unwrap()
            .then(response => {
                console.log(response);
                setFormValues({...response})
            })
            .catch(e => {
                console.log(e);
            });

    }, [params.id]);

    useEffect(() => {
        console.log(`**** loading: ${loading}`)
    }, [loading]);

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
        dispatch(updateBook(formValues))
            .unwrap()
            .then(response => {
                console.log(response);
            })
            .catch(e => {
                console.log(e);
            });
    }

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col className="mx-auto col-10 col-md-8 col-lg-6">
                    <h1 className="text-center">Update Book</h1>
                    {!loading ?
                        (<Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="albumName">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter a title" onChange={handleChange}
                                          name="title"
                                          value={formValues.title}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="artist">
                            <Form.Label>Author</Form.Label>
                            <Form.Control type="text" placeholder="Enter an author" onChange={handleChange}
                                          name="author"
                                          value={formValues.author}/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Update
                        </Button>
                        </Form>) : <div>Loading...</div>
}
                </Col>
            </Row>
        </Container>
    );
}

export default BookUpdate;