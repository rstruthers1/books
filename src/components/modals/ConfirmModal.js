import {Col, Modal, Image, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import * as PropTypes from "prop-types";


function ConfirmModal(props) {

    function handleConfirmClick(ev) {
        handleHide()
        props.yesAction()
    }

    function handleHide() {
        props.onHide()
    }

    return <Modal show={props.show} onHide={handleHide}>
        <Modal.Header closeButton>
            <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {props.message}
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleHide}>
                Cancel
            </Button>
            <Button variant="primary"
                    onClick={handleConfirmClick}>
                {props.yesButtonMessage}
            </Button>
        </Modal.Footer>
    </Modal>;
}

ConfirmModal.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    title: PropTypes.string,
    message: PropTypes.string,
    yesButtonMessage: PropTypes.string,
    yesAction: PropTypes.func
};


export default ConfirmModal;