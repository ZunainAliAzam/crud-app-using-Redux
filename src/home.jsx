// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CreateModal from "./createModal";
import { deleteUser } from "./userSlice";

const Home = () => {
  const [modalShow, setModalShow] = useState(false);
  const handleShow = () => setModalShow(true);
  const handleClose = () => setModalShow(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setModalShow(true);
  };

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  console.log(users);
  if (!users) {
    return <div>Loading...</div>;
  }

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <div className="container">
      <h2>CRUD App</h2>
      <button className="btn btn-success my-3" onClick={handleShow}>
        Create +
      </button>
      <CreateModal show={modalShow} handleClose={handleClose} />

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <CreateModal
          show={modalShow}
          handleClose={() => setModalShow(false)}
          userToUpdate={selectedUser}
        />
      </table>
    </div>
  );
};

export default Home;
