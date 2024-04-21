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
import DataTableOfSubscription from "./Table";

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const SubscriptionPage = () => {
  return (
    <>
      <Breadcrumbs
        title="Subscription"
        data={[{ title: "Apps" }, { title: "Subscription" }]}
      />
      <Card>
        <div className="d-flex justify-content-between p-2">
          <h3>Subscription Lists</h3>
          <AddSubscription />
        </div>
        <DataTableOfSubscription />
      </Card>
    </>
  );
};

export default SubscriptionPage;
