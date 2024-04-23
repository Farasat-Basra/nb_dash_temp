// ** React Imports
import { Fragment, useState } from "react";

// ** Reactstrap Imports
import {
  Card,
  Row,
  Col,
  Modal,
  Input,
  Label,
  Button,
  CardBody,
  CardText,
  CardTitle,
  ModalBody,
  ModalHeader,
  FormFeedback,
  Spinner,
} from "reactstrap";

// ** Third Party Components
import Select from "react-select";
import { User, Check, X } from "react-feather";
import { useForm, Controller } from "react-hook-form";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import { QueryClient, useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { endpoint } from "./data";
import axiosInstance from "../../../utility/axiosInstance";

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "suspended", label: "Suspended" },
];

const defaultValues = {
  firstName: "Bob",
  lastName: "Barton",
  username: "bob.dev",
};

const AddSubscription = () => {
  // ** States
  const [show, setShow] = useState(false);
  const queryClient = useQueryClient();
  // ** Hooks
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const postSubscription = async (data) => {
    const newData = {
      ...data,
      name: data.name,
      amount: Number(data.amount),
      status: data.status.value,
    };
    try {
      const response = await axiosInstance.post(
        "/admin/create/subscription/plan",
        newData
      );
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };
  const { mutate, isLoading } = useMutation({
    mutationFn: postSubscription,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: endpoint });
      toast.success("Subscription added successfully");
    },
    onError: () => {
      toast.error("Failed to add subscription");
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <Fragment>
      <Button color="primary" onClick={() => setShow(true)}>
        Add Subscription
      </Button>
      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShow(!show)}
        ></ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">Add New Subscription</h1>
          </div>
          <Row
            tag="form"
            className="gy-1 pt-75"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Col md={6} xs={12}>
              <Label className="form-label" for="amount">
                Amount
              </Label>
              <Controller
                control={control}
                name="amount"
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      id="amount"
                      placeholder="amount"
                      value={field.value}
                      invalid={errors.amount && true}
                    />
                  );
                }}
              />
              {errors.amount && (
                <FormFeedback>Please enter a valid First Name</FormFeedback>
              )}
            </Col>
            <Col md={6} xs={12}>
              <Label className="form-label" for="nName">
                Name
              </Label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="name"
                    placeholder="name"
                    invalid={errors.lastName && true}
                  />
                )}
              />
              {errors.name && (
                <FormFeedback>Please enter a valid Last Name</FormFeedback>
              )}
            </Col>
            <Col md={6} xs={12}>
              <Label className="form-label" for="status">
                Status:
              </Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    id="status"
                    isClearable={false}
                    className="react-select"
                    classNamePrefix="select"
                    options={statusOptions}
                    theme={selectThemeColors}
                    defaultValue={statusOptions[0]}
                  />
                )}
              />
            </Col>
            <Col md={6} xs={12}>
              <Label className="form-label" for="email">
                Expiry Date
              </Label>
              <Input type="email" id="email" placeholder="example@domain.com" />
            </Col>
            <Col xs={12} className="text-center mt-2 pt-50">
              <Button
                type="submit"
                className="me-1"
                color="primary"
                onClick={() => setShow(false)}
              >
            {isLoading ? <Spinner color="white" size="lg" /> : "Add Subscription"}
              </Button>
              <Button
                type="reset"
                color="secondary"
                outline
                onClick={() => setShow(false)}
              >
                Discard
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default AddSubscription;
