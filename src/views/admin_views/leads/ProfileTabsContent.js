import { Badge, Button, Col, Input, Label, Row, Spinner } from "reactstrap";
import {
  EmailVerifiedChecked,
} from "../../../utility/Svgs";
import { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { selectThemeColors } from "@utils";
import makeAnimated from "react-select/animated";
import Select, { components } from "react-select"; // eslint-disable-line
import moment from "moment";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import axiosInstance from "../../../utility/axiosInstance";
import { getAllLeads } from "../../../redux/leadsUser";

export const Contact = ({ singleLeads: data }) => {
  const [spinner, setSpinner] = useState(false);
  const dispatch = useDispatch();
  const item = data?.lead;
  const animatedComponents = makeAnimated();
  const tagsArray = [
    { value: "Technology", label: "Technology" },
    { value: "Business", label: "Business" },
    { value: "Health", label: "Health" },
    { value: "Travel", label: "Travel" },
    { value: "Food", label: "Food" },
    { value: "Science", label: "Science" },
    { value: "Art", label: "Art" },
    { value: "Sports", label: "Sports" },
    { value: "Fashion", label: "Fashion" },
    { value: "Education", label: "Education" },
  ];

  const { control, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (data) {
      reset({
        firstName: item?.firstName,
        lastName: item?.lastName,
        email: item?.email,
        // position: item?.position,
        tags: item?.tags.map((item) => {
          return { value: item.name, label: item.name };
        }),
      });
    }
  }, [data]);

  const onSubmit = async (data) => {
    const newData = {
      ...data,
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email,
      position: data?.position,
      tags: data?.tags.map((item) => {
        return item.value;
      }),
    };
    try {
      const response = await axiosInstance.put(
        `/leads/update/${item?._id}`,
        newData
      );
      setSpinner(false);
      console.log(response);
      dispatch(getAllLeads());
      toast.success("Lead updated successfully");
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };
  const iconOptions = [
    {
      options: [
        { label: "Software Engineer", value: "software_engineer" },
        { label: "Graphic Designer", value: "graphic_designer" },
        { label: "Teacher", value: "teacher" },
        { label: "Medical Doctor", value: "medical_doctor" },
        { label: "Marketing Specialist", value: "marketing_specialist" },
      ],
    },
  ];

  const OptionComponent = ({ data, ...props }) => {
    const Icon = data.icon;

    return (
      <components.Option {...props}>
        {/* <Icon className="me-50" size={14} /> */}
        {data.label}
      </components.Option>
    );
  };

  return (
    <>
      <div className="d-flex  gap-1 ps-1 ">
        <Input type="checkbox" />
        <p>Hide empty fields</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <Row>
          <Col sm="12" className="mb-1">
            <Label className="form-label" for="nameVertical">
              Full NAme
            </Label>
            <Controller
              name="fullName"
              control={control}
              value={item?.firstName + " " + item?.lastName}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  name="fullName"
                  id="nameVertical"
                />
              )}
            />
          </Col>
        </Row> */}
        <Row className="d-flex ">
          <Col className="">
            <div sm="12" className="mb-1">
              <Label className="form-label" for="nameVertical">
                First Name
              </Label>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    name="firstName"
                    placeholder="name"
                    id="nameVertical"
                  />
                )}
              />
            </div>
          </Col>
          <Col>
            <div sm="12" className="mb-1">
              <Label className="form-label" for="nameVertical">
                Last Name
              </Label>
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    name="lastName"
                    id="nameVertical"
                    placeholder="name"
                    // placeholder="john.doe"
                  />
                )}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="mb-1">
              <Label
                className="form-label d-flex align-items-center "
                for="nameVertical"
              >
                Email
                <span style={{ paddingLeft: "5px" }}>
                  <EmailVerifiedChecked />
                </span>
              </Label>
              <Controller
                name="email"
                control={control}
                placeholder="email"
                render={({ field }) => (
                  <Input {...field} type="text" name="name" id="nameVertical" />
                )}
              />
            </div>
          </Col>
        </Row>
        <Row></Row>
        <Row>
          <Col className="mb-1">
            <Label
              className="form-label d-flex align-items-center "
              for="nameVertical"
            >
              Position/ Title
            </Label>
            <Controller
              name="position"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={iconOptions}
                  className="react-select"
                  classNamePrefix="Select Folder (optional)"
                  placeholder="Software Engineer"
                  components={{
                    Option: OptionComponent,
                  }}
                />
              )}
            />
          </Col>
        </Row>
        <Row>
          <Col className="mb-1">
            <Label
              className="form-label d-flex align-items-center "
              for="nameVertical"
            >
              Contact Address
            </Label>
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <Input {...field} type="text" name="name" id="nameVertical" />
              )}
            />
          </Col>
        </Row>
        <Row>
          <Col className="mb-5">
            <Label
              className="form-label d-flex align-items-center "
              for="nameVertical"
            >
              Tags
            </Label>
            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <CreatableSelect
                  {...field}
                  isMulti
                  value={field.value}
                  isClearable={true}
                  theme={selectThemeColors}
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  options={tagsArray}
                  className="react-select"
                  classNamePrefix="select"
                />
              )}
            />
          </Col>
        </Row>
        <Button color="primary" type="submit" onClick={() => setSpinner(true)}>
          {spinner ? <Spinner color="light" /> : "Update"}
        </Button>
      </form>
    </>
  );
};

export const Company = ({ singleLeads: data }) => {
  const item = data.lead;
  console.log("🚀 ~ Company ~ item:", item)
  const { control, handleSubmit, reset } = useForm();
  const resetData = () => {
    reset({
      companyName: item?.company?.name,
      website: item?.company?.website,
      industry: item?.company?.industry,
      companySize: item?.company?.size,
      noOfemployee: item?.company?.employees,
      businessAddress: item?.company?.address,
      city: item?.company?.city,
      state: item?.company?.state,
      country: item?.company?.country,
    });
  };

  useEffect(
    (item) => {
      if (item) resetData();
    },
    [item]
  );

  const onSubmit = () => {};
  const iconOptions = [
    {
      options: [
        {
          value: "it",
          label: "Information Technologies",
        },
        {
          value: "webDevelopment",
          label: "Web Development",
        },
      ],
    },
  ];
  const OptionComponent = ({ data, ...props }) => {
    const Icon = data.icon;
  
    return (
      <components.Option {...props}>
        {/* <Icon className="me-50" size={14} /> */}
        {data.label}
      </components.Option>
    );
  };
  return (
    <>
      <div className="d-flex  gap-1 ps-1 ">
        <Input type="checkbox" />
        <p>Hide empty fields</p>
      </div>
      <Row>
        <Col sm="12" className="mb-1">
          <Label className="form-label" for="nameVertical">
            Company NAme
          </Label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                name="name"
                id="nameVertical"
                placeholder="name"
              />
            )}
          />
        </Col>
      </Row>
      <Row>
        <Col sm="12" className="mb-1">
          <Label className="form-label" for="nameVertical">
            Company Website
          </Label>
          <Controller
            name="website"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                name="name"
                id="nameVertical"
                placeholder="https://abc.com"
              />
            )}
          />
        </Col>
      </Row>
      <Row>
        <Col sm="12" className="mb-1">
          <Label className="form-label" for="nameVertical">
            Industry
          </Label>
          <Controller
            name="industry"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={iconOptions}
                className="react-select"
                classNamePrefix="Select Folder (optional)"
                placeholder="IT "
                components={{
                  Option: OptionComponent,
                }}
              />
            )}
          />
        </Col>
      </Row>
      <Row>
        <Col sm="12" className="mb-1">
          <Label className="form-label" for="nameVertical">
            # of Employees
          </Label>
          <Controller
            name="noOfemployee"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={iconOptions}
                className="react-select"
                classNamePrefix="Select Folder (optional)"
                placeholder="0-10"
                components={{
                  Option: OptionComponent,
                }}
              />
            )}
          />
        </Col>
      </Row>
      <Row>
        <Col sm="12" className="mb-1">
          <Label className="form-label" for="nameVertical">
            Business Address
          </Label>
          <Controller
            name="businessAddress"
            control={control}
            render={({ field }) => (
              <Input
                type="text"
                name="businessAddress"
                id="nameVertical"
                placeholder="Dubai,UAE"
              />
            )}
          />
        </Col>
      </Row>
      <Row className="d-flex ">
        <Col className="">
          <div sm="12" className="mb-1">
            <Label className="form-label" for="nameVertical">
              City
            </Label>
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  name="name"
                  id="nameVertical"
                  placeholder="Dubai"
                />
              )}
            />
          </div>
        </Col>
        <Col>
          <div sm="12" className="mb-1">
            <Label className="form-label" for="nameVertical">
              State
            </Label>
            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  name="name"
                  id="nameVertical"
                  placeholder="Dubai"
                />
              )}
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm="12" className="mb-1">
          <Label className="form-label" for="nameVertical">
            Country
          </Label>

          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <Input
                type="text"
                name="name"
                id="nameVertical"
                placeholder="country"
              />
            )}
          />
        </Col>
      </Row>
    </>
  );
};
export const Details = ({ singleLeads: data }) => {
  const item = data.lead;

  return (
    <>
      <table className="table">
        <tbody>
          <tr style={{ backgroundColor: "none" }}>
            <td className="" style={{ backgroundColor: "#fff" }}>
              Date Created
            </td>
            <td style={{ backgroundColor: "#fff" }}>
              {moment(item?.createdAt).format("MMM DD, YYYY")}
            </td>
          </tr>
          <tr>
            <td style={{ backgroundColor: "#fff" }}>Created By</td>
            <td style={{ backgroundColor: "#fff" }}>
              {item?.firstName + " " + item?.lastName}{" "}
            </td>
          </tr>
          <tr>
            <td style={{ backgroundColor: "#fff" }}>Verification Results</td>
            <td style={{ backgroundColor: "#fff" }}>
              <Badge
                color={item?.isVerified === true ? "success" : "secondary"}
              >
                {item?.isVerified === true ? "Passed" : "Fail"}
              </Badge>
            </td>
          </tr>
          <tr>
            <td style={{ backgroundColor: "#fff" }}>Last Date Verified</td>
            <td style={{ backgroundColor: "#fff" }}>14 Dec 2023</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
