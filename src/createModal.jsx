// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { addUser, updateUser } from "./userSlice";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

const CreateModal = ({ show, handleClose, userToUpdate }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (userToUpdate) {
      setName(userToUpdate.name);
      setEmail(userToUpdate.email);
    }
  }, [userToUpdate]);

  const nameChange = (e) => {
    setName(e.target.value);
  };

  const emailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userToUpdate) {
      dispatch(updateUser({ ...userToUpdate, name, email }));
    } else {
      dispatch(addUser({ id: Date.now(), name, email }));
    }

    handleClose();
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {userToUpdate ? "Edit User" : "Add New User"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
          <div className="w-100 bg-secondary text-white p-5">
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={nameChange}
                  className="mb-3"
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email Address:</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email Address"
                  value={email}
                  onChange={emailChange}
                  className="mb-3"
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                {userToUpdate ? "Update" : "Submit"}
              </Button>
            </Form>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

CreateModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  userToUpdate: PropTypes.func.isRequired,
};

export default CreateModal;
