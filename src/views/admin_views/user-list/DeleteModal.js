// ** React Imports
import { Fragment, useState } from "react";

// ** Reactstrap Imports
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import { setUserID } from "../../../redux/userSlice";
import { useSelector } from "react-redux";
import { Trash2 } from "react-feather";
import { useAppDispatch } from "../../../utility/instances";
import { use } from "i18next";
import { useMutation, useQuery, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import axiosInstance from "../../../utility/axiosInstance";

const DeleteUser = ({ show, setShow, toggle, id }) => {
  const { userID } = useSelector((state) => state.users);
  const dispatch = useAppDispatch();

const getTodos = async () => {
  const response = await axiosInstance.get(`/admin/get/single/user/${id}`);
  return response.data;
}

  const queryClient = useQueryClient();
  const query = useQuery({ queryKey: ["todos"], queryFn: getTodos });



  // fetcher
  const deletePost = async () => {
    const response = await axiosInstance.delete(`/admin/delete/user/${id}`);
    return response.data;
  };


    const { mutate, isLoading, isError } = useMutation(deletePost, {
      onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
        toast.success("User deleted successfully");
        setShow(!show);
      },
      onError: () => {
        toast.error("Failed to delete user");
      },
      isLoading: false,
    });
  const handleDelete = () => {
    // DeleteData();
    mutate();
  };

  return (
    <Fragment>
      <div className="d-flex">
        <Trash2 size={14} className="me-50" />
        <span onClick={() => dispatch(setUserID(id))} className="align-middle">
          Delete
        </span>
      </div>
      <Modal
        isOpen={show}
        toggle={toggle}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShow(!show)}
        ></ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">Are you sure want to delete?</h1>
            <p className="mb-3"> This action cannot be undone.</p>
          </div>
          <div className="d-flex gap-2 justify-content-center ">
            <Button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShow(!show)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="btn btn-danger"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default DeleteUser;
