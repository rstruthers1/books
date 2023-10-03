import {Col, Modal, Image, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import * as PropTypes from "prop-types";
import {useEffect, useState} from "react";

function ImageModal(props) {

    const [modalImageSrc, setModalImageSrc] = useState('')
    const [imageFormData, setImageFormData] = useState(null)

    function onImageFileChange(ev) {
        const formData = new FormData();
        formData.append("file", ev.target.files[0]);
        setImageFormData(formData)
        const newImage = URL.createObjectURL(ev.target.files[0])
        setModalImageSrc(newImage)
    }

    function handleUpdateClick(ev) {
        handleHide()
        props.onImageSelected(imageFormData)
    }

    function handleHide() {
        setModalImageSrc('')
        setImageFormData(null)
        props.onHide()
    }

    return <Modal show={props.show} onHide={handleHide}>
        <Modal.Header closeButton>
            <Modal.Title>Upload Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Col sm={6} className="m-auto">
                <Image src={modalImageSrc ? modalImageSrc : props.originalImageSrc} width="500px"
                style={{marginBottom: "10px"}}/>
            </Col>
            <Col md={10} className="m-auto">
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Control type="file" name="file" onChange={onImageFileChange}/>
                </Form.Group>
            </Col>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleHide}>
                Cancel
            </Button>
            <Button variant="primary"
                    onClick={handleUpdateClick}
                    disabled={!imageFormData}>
                Update Image
            </Button>
        </Modal.Footer>
    </Modal>;
}

ImageModal.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    originalImageSrc: PropTypes.any,
    onImageSelected: PropTypes.func
};


export default ImageModal;