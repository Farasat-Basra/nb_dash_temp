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
} from "reactstrap";

// ** Third Party Components
import Select from "react-select";
import { User, Check, X, Archive } from "react-feather";
import { useForm, Controller } from "react-hook-form";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useFetchUsers } from "./useFetchUsers";
import { useSelector } from "react-redux";
import axiosInstance from "../../../utility/axiosInstance";

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "suspended", label: "Suspended" },
];

const countryOptions = [
  { value: "uk", label: "UK" },
  { value: "usa", label: "USA" },
  { value: "france", label: "France" },
  { value: "russia", label: "Russia" },
  { value: "canada", label: "Canada" },
];

const languageOptions = [
  { value: "english", label: "English" },
  { value: "spanish", label: "Spanish" },
  { value: "french", label: "French" },
  { value: "german", label: "German" },
  { value: "dutch", label: "Dutch" },
];

const defaultValues = {
  firstName: "Sam",
  lastName: "Quinn",
  email: "samquinn@example.com",
  phoneNumber: "3210987654",
  country: "USA",
  state: "WA",
  city: "Seattle",
  role: "admin",
};

const EditUser = ({ show, setShow, toggle }) => {
  const { userID } = useSelector((state) => state.users);
  const id = userID;
  const getTodos = async () => {
    const response = await axiosInstance.get("/admin/get/single/user/" + id);
    return response.data;
  };
  // const { data } = useQuery("singleUserData", async () => {
  //   const response = await axiosInstance.get("/admin/get/single/user/" + id);
  //   return response.data;
  // });
  // console.log("singleUserData", data);

  // ** Hooks
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const queryClient = useQueryClient();
  const query = useQuery({ queryKey: ["todos"], queryFn: getTodos });
  const postTodo = async (data) => {
    try {
      const response = await axiosInstance.put("/admin/edit/user/" + id, data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const mutation = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
    // postTodo(data);
    if (Object.values(data).every((field) => field.length > 0)) {
      return null;
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: "manual",
          });
        }
      }
    }
  };

  return (
    <Fragment>
      <div className="d-flex align-items-center">
        <Archive size={14} className="me-50" />
        <p onClick={toggle}>Edit</p>
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
            <h1 className="mb-1">Edit User</h1>
          </div>
          <Row
            tag="form"
            className="gy-1 pt-75"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Col md={6} xs={12}>
              <Label className="form-label" for="firstName">
                First Name
              </Label>
              <Controller
                control={control}
                name="firstName"
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      id="firstName"
                      placeholder="John"
                      value={field.value}
                      invalid={errors.firstName && true}
                    />
                  );
                }}
              />
              {errors.firstName && (
                <FormFeedback>Please enter a valid First Name</FormFeedback>
              )}
            </Col>
            <Col md={6} xs={12}>
              <Label className="form-label" for="lastName">
                Last Name
              </Label>
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="lastName"
                    placeholder="Doe"
                    invalid={errors.lastName && true}
                  />
                )}
              />
              {errors.lastName && (
                <FormFeedback>Please enter a valid Last Name</FormFeedback>
              )}
            </Col>
            <Col md={6} xs={12}>
              <Label className="form-label" for="email">
                Email
              </Label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="email"
                    placeholder="Doe"
                    invalid={errors.email && true}
                  />
                )}
              />
              {errors.email && (
                <FormFeedback>Please enter a valid Last Name</FormFeedback>
              )}
            </Col>
            <Col md={6} xs={12}>
              <Label className="form-label" for="phoneNumber">
                Contact
              </Label>
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="phoneNumber"
                    placeholder="Doe"
                    invalid={errors.phoneNumber && true}
                  />
                )}
              />
              {errors.phoneNumber && (
                <FormFeedback>Please enter a valid Last Name</FormFeedback>
              )}
            </Col>
            <Col md={6} xs={12}>
              <Label className="form-label" for="country">
                Country
              </Label>
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="country"
                    placeholder="Doe"
                    invalid={errors.country && true}
                  />
                )}
              />
              {errors.country && (
                <FormFeedback>Please enter a valid Last Name</FormFeedback>
              )}
            </Col>
            <Col md={6} xs={12}>
              <Label className="form-label" for="role">
                Role
              </Label>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="role"
                    placeholder="Doe"
                    invalid={errors.role && true}
                  />
                )}
              />
              {errors.role && (
                <FormFeedback>Please enter a valid Last Name</FormFeedback>
              )}
            </Col>
            <Col md={6} xs={12}>
              <Label className="form-label" for="city">
                City
              </Label>
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="city"
                    placeholder="Doe"
                    invalid={errors.city && true}
                  />
                )}
              />
              {errors.city && (
                <FormFeedback>Please enter a valid Last Name</FormFeedback>
              )}
            </Col>
            <Col md={6} xs={12}>
              <Label className="form-label" for="status">
                Status:
              </Label>
              <Select
                id="status"
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={statusOptions}
                theme={selectThemeColors}
                defaultValue={statusOptions[0]}
              />
            </Col>

            <Col xs={12} className="text-center mt-2 pt-50">
              <Button
                // onClick={() => {
                //   mutation.mutate({
                //     id: Date.now(),
                //     title: "Do Laundry",
                //   });
                // }}
                type="submit"
                className="me-1"
                color="primary"
                // onClick={() => setShow(false)}
              >
                Submit
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

export default EditUser;
