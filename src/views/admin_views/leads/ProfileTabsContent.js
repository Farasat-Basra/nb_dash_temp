import { Badge, Col, Input, Label, Row } from "reactstrap";
import {
  EmailVerifiedChecked,
  LeftArrow,
  NextIcon,
  PreviousIcon,
} from "../../../utility/Svgs";
import { useState } from "react";
import IndustrySelector from "./IndustrySelector";
import EmployeesSelector from "./EmployeesSelector";
import CountrySelector from "./CountrySelector";
import PositionSelector from "./PositionSelector";
import CreatableSelect from "react-select/creatable";
import { selectThemeColors } from "@utils";
import makeAnimated from "react-select/animated";
import Select, { components } from "react-select"; // eslint-disable-line
import moment from "moment";

export const Contact = ({ singleLeads: data }) => {
  const item = data?.lead;
  const animatedComponents = makeAnimated();

  console.log("ssssssssssssssssssss", data);

  const tagsArray = [
    { id: 1, label: "Technology", color: "#36A2EB" },
    { id: 2, label: "Business", color: "#FFCE56" },
    { id: 3, label: "Health", color: "#FF6384" },
    { id: 4, label: "Travel", color: "#4BC0C0" },
    { id: 5, label: "Food", color: "#FF9F40" },
    { id: 6, label: "Science", color: "#9966FF" },
    { id: 7, label: "Art", color: "#FFD700" },
    { id: 8, label: "Sports", color: "#2E8B57" },
    { id: 9, label: "Fashion", color: "#FF69B4" },
    { id: 10, label: "Education", color: "#7B68EE" },
  ];

  return (
    <>
      <div className="d-flex  gap-1 ps-1 ">
        <Input type="checkbox" />
        <p>Hide empty fields</p>
      </div>
      <Row>
        <Col sm="12" className="mb-1">
          <Label className="form-label" for="nameVertical">
            Full NAme
          </Label>
          <Input
            type="text"
            name="name"
            id="nameVertical"
            placeholder="john.doe"
            value={item?.firstName + " " + item?.lastName}
          />
        </Col>
      </Row>
      <Row className="d-flex ">
        <Col className="">
          <div sm="12" className="mb-1">
            <Label className="form-label" for="nameVertical">
              First Name
            </Label>
            <Input
              type="text"
              name="name"
              id="nameVertical"
              // placeholder="john.doe"
              value={item?.firstName || "name"}
            />
          </div>
        </Col>
        <Col>
          <div sm="12" className="mb-1">
            <Label className="form-label" for="nameVertical">
              Last Name
            </Label>
            <Input
              type="text"
              name="name"
              id="nameVertical"
              // placeholder="john.doe"
              value={item?.lastName || "name"}
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
            <Input
              type="text"
              name="name"
              id="nameVertical"
              // placeholder="john.doe"
              value={item?.email || "email"}
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
          <PositionSelector />
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
          <Input
            type="text"
            name="name"
            id="nameVertical"
            // placeholder="john.doe"
            value={item?.address || "Address"}
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
          <CreatableSelect
            isMulti
            isClearable={true}
            theme={selectThemeColors}
            closeMenuOnSelect={false}
            components={animatedComponents}
            defaultValue={[tagsArray[4], tagsArray[5]]}
            options={tagsArray}
            className="react-select"
            classNamePrefix="select"
          />
        </Col>
      </Row>
    </>
  );
};
export const Company = ({ singleLeads: data }) => {
  const item = data.lead;
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
          <Input
            type="text"
            name="name"
            id="nameVertical"
            // placeholder="company"
            value={item?.companyName || "company"}
          />
        </Col>
      </Row>
      <Row>
        <Col sm="12" className="mb-1">
          <Label className="form-label" for="nameVertical">
            Company Website
          </Label>
          <Input
            type="text"
            name="name"
            id="nameVertical"
            placeholder="https://abc.com"
          />
        </Col>
      </Row>
      <Row>
        <Col sm="12" className="mb-1">
          <Label className="form-label" for="nameVertical">
            Industry
          </Label>
          <IndustrySelector />
        </Col>
      </Row>
      <Row>
        <Col sm="12" className="mb-1">
          <Label className="form-label" for="nameVertical">
            # of Employees
          </Label>
          <EmployeesSelector />
        </Col>
      </Row>
      <Row>
        <Col sm="12" className="mb-1">
          <Label className="form-label" for="nameVertical">
            Business Address
          </Label>
          <Input
            type="text"
            name="name"
            id="nameVertical"
            placeholder="Dubai,UAE"
          />
        </Col>
      </Row>
      <Row className="d-flex ">
        <Col className="">
          <div sm="12" className="mb-1">
            <Label className="form-label" for="nameVertical">
              City
            </Label>
            <Input
              type="text"
              name="name"
              id="nameVertical"
              placeholder="Dubai"
            />
          </div>
        </Col>
        <Col>
          <div sm="12" className="mb-1">
            <Label className="form-label" for="nameVertical">
              State
            </Label>
            <Input
              type="text"
              name="name"
              id="nameVertical"
              placeholder="Dubai"
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm="12" className="mb-1">
          <Label className="form-label" for="nameVertical">
            Country
          </Label>
          <CountrySelector />
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
