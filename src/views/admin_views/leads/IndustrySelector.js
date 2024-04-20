import { Col, Label } from "reactstrap";

import Select, { components } from "react-select"; // eslint-disable-line

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

const IndustrySelector = () => {
  return (
    <>
      <div>
        <Col className="mb-1" md="12" sm="12">
          <Select
            options={iconOptions}
            className="react-select"
            classNamePrefix="Select Folder (optional)"
            placeholder="IT "
            components={{
              Option: OptionComponent,
            }}
          />
        </Col>
      </div>
    </>
  );
};
export default IndustrySelector;
