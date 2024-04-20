import { Col, Label } from "reactstrap";

import Select, { components } from "react-select"; // eslint-disable-line

const iconOptions = [
  {
    options: [
        { label: 'Software Engineer', value: 'software_engineer' },
        { label: 'Graphic Designer', value: 'graphic_designer' },
        { label: 'Teacher', value: 'teacher' },
        { label: 'Medical Doctor', value: 'medical_doctor' },
        { label: 'Marketing Specialist', value: 'marketing_specialist' },
     
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

const PositionSelector = () => {
  return (
    <>
      <div>
        <Col className="mb-1" md="12" sm="12">
          <Select
            options={iconOptions}
            className="react-select"
            classNamePrefix="Select Folder (optional)"
            placeholder="Software Engineer"
            components={{
              Option: OptionComponent,
            }}
          />
        </Col>
      </div>
    </>
  );
};
export default PositionSelector;
