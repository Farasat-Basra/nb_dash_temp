import { Col, Label } from "reactstrap";

import Select, { components } from "react-select"; // eslint-disable-line

const iconOptions = [
 
    { label: "United States", value: "US" },
    { label: "United Arab Emirates (UAE) ", value: "UAE" },
    { label: "Canada", value: "CA" },
    { label: "United Kingdom", value: "GB" },
    { label: "Australia", value: "AU" },
    { label: "Germany", value: "DE" },
    { label: "France", value: "FR" },
    { label: "Italy", value: "IT" },
    { label: "Spain", value: "ES" },
    { label: "Japan", value: "JP" },
    { label: "South Korea", value: "KR" },
    { label: "China", value: "CN" },
    { label: "India", value: "IN" },
    { label: "Brazil", value: "BR" },
    { label: "Mexico", value: "MX" },
    { label: "Argentina", value: "AR" },
    { label: "South Africa", value: "ZA" },
    { label: "Nigeria", value: "NG" },
    { label: "Russia", value: "RU" },
    { label: "Turkey", value: "TR" },
    { label: "Saudi Arabia", value: "SA" },
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

const CountrySelector = () => {
  return (
    <>
      <div>
        <Col className="mb-5" md="12" sm="12">
          <Select
            options={iconOptions}
            className="react-select"
            classNamePrefix="Select Folder (optional)"
            placeholder="Dubai"
            components={{
              Option: OptionComponent,
            }}
          />
        </Col>
      </div>
    </>
  );
};
export default CountrySelector;
