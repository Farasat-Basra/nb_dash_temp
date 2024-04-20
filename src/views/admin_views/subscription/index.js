import { MoreVertical, Edit, Trash } from "react-feather";
import {
  Table,
  Badge,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Card,
  Button,
} from "reactstrap";
import AddSubscription from "./AddSubscription";
import BreadcrumbsDefault from "../../../adminComponents/breadCrumbs";
import Breadcrumbs from '@components/breadcrumbs'

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const SubscriptionPage = () => {
  return (
    <>
      <Breadcrumbs
        title="Subscription"
        data={[{ title: "Apps" }, { title: "Subscription" }]}
      />
      <Card>
        <div className="text-end p-2">
          <AddSubscription />
        </div>
        <Table responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Expiry Date</th>
              <th>Subscription Status</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>
                  {/* <img className='me-75' src={angular} alt='angular' height='20' width='20' /> */}
                  <span className="align-middle fw-bold"> companyName </span>
                </td>
                <td>$100</td>
                <td>Approved</td>
                <td>10/09/23</td>
                <td className="">
                  <Badge pill color="light-primary" className="me-1">
                    Active
                  </Badge>
                </td>
                <td>
                  <UncontrolledDropdown>
                    <DropdownToggle
                      className="icon-btn hide-arrow"
                      color="transparent"
                      size="sm"
                      caret
                    >
                      <MoreVertical size={15} />
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem
                        href="/"
                        onClick={(e) => e.preventDefault()}
                      >
                        <Edit className="me-50" size={15} />{" "}
                        <span className="align-middle">Edit</span>
                      </DropdownItem>
                      <DropdownItem
                        href="/"
                        onClick={(e) => e.preventDefault()}
                      >
                        <Trash className="me-50" size={15} />{" "}
                        <span className="align-middle">Delete</span>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </>
  );
};

export default SubscriptionPage;
