import {useState} from "react";
import {useDispatch} from "react-redux";
import {createBook} from "../../features/book/bookSlice";
import {Col, Container, Form, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";


const BookCreate = () => {
  const [title, setTitle] = useState('');

  const dispatch = useDispatch();
  
  const handleChange = (ev) => {
    setTitle(ev.target.value)
  }
  
  const handleSubmit = (ev) => {
    ev.preventDefault();
    dispatch(createBook(title))
    .unwrap()
    .then(response => {
      console.log(response);
      setTitle('')
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
                    <Form.Control type="text" placeholder="Enter book title" onChange={handleChange} value={title}/>
                    </Form.Group>
                <Button variant="primary" type="submit" >
                    Create
                </Button>
            </Form>
                </Col>
                </Row>
        </Container>
  )
}

export default BookCreate;
