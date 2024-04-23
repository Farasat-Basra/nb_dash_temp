// ** User List Component
import BreadcrumbsDefault from "../../../adminComponents/breadCrumbs";

// ** Reactstrap Imports
import { Row, Col } from "reactstrap";

// ** Custom Components
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";

// ** Icons Imports
import { User, UserPlus, UserCheck, UserX } from "react-feather";

// ** Styles
import "@styles/react/apps/app-users.scss";
import DataTableOfUsers from "./newTable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllUsers } from "../../../redux/userSlice";
import { useAppDispatch } from "../../../utility/instances";
import Breadcrumbs from "@components/breadcrumbs";
import { useFetchUsers } from "./useFetchUsers";

const UsersList = () => {
  const { data } = useFetchUsers();
  return (
    <div className="app-user-list">
      <Breadcrumbs
        title="Users List"
        data={[{ title: "Apps" }, { title: "User List" }]}
      />
      <Row>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="primary"
            statTitle="Total Users"
            icon={<User size={20} />}
            renderStats={
              <h3 className="fw-bolder mb-75"> {data?.length || 0}</h3>
            }
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="danger"
            statTitle="Paid Users"
            icon={<UserPlus size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">0</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="success"
            statTitle="Active Users"
            icon={<UserCheck size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">19,860</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="warning"
            statTitle="Pending Users"
            icon={<UserX size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">237</h3>}
          />
        </Col>
      </Row>
      <DataTableOfUsers />
    </div>
  );
};

export default UsersList;
