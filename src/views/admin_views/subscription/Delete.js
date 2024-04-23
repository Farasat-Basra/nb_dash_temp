// ** React Imports
import { Fragment, useState } from "react";

// ** Reactstrap Imports
import { Button, Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import { setUserID } from "../../../redux/userSlice";
import { Trash2 } from "react-feather";
import { useAppDispatch } from "../../../utility/instances";
import { useMutation, useQuery, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import axiosInstance from "../../../utility/axiosInstance";
import { endpoint } from "./data";

const DeleteSubscription = ({ show, setShow, toggle, id }) => {
  console.log("id", id);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  // fetcher
  const deletePost = async () => {
    const response = await axiosInstance.delete(`/admin/delete/subscription/plan/${id}`);
    return response.data;
  };
  const { mutate, isLoading, isError } = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: endpoint });
      toast.success("Subscription deleted successfully");
      setShow(!show);
    },
    onError: () => {
      toast.error("Failed to delete user");
    },
    isLoading: false,
  });
  const handleDelete = () => {
    mutate();
  };

  return (
    <Fragment>
      <div className="d-flex">
        <Trash2 size={14} className="me-50" />
        <span  className="align-middle">
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
              {isLoading ? <Spinner color="white" size="lg" /> : "Delete"}
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default DeleteSubscription;
