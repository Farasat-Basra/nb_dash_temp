import { Col, Label } from "reactstrap";

import Select, { components } from "react-select"; // eslint-disable-line

const iconOptions = [
  {
    options: [
      {
        value: "0",
        label: "0-10",
      },
      {
        value: "1",
        label: "10-20",
      },
      {
        value: "2",
        label: "30-50",
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

const EmployeesSelector = () => {
  return (
    <>
      <div>
        <Col className="mb-1" md="12" sm="12">
          <Select
            options={iconOptions}
            className="react-select"
            classNamePrefix="Select Folder (optional)"
            placeholder="0-10"
            components={{
              Option: OptionComponent,
            }}
          />
        </Col>
      </div>
    </>
  );
};
export default EmployeesSelector;
