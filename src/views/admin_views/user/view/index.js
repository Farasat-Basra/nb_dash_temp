// ** React Imports
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

// ** Store & Actions
import { getUser } from "../store";
import { useSelector, useDispatch } from "react-redux";

// ** Reactstrap Imports
import { Row, Col, Alert } from "reactstrap";

// ** User View Components
import UserTabs from "./Tabs";
import PlanCard from "./PlanCard";
import UserInfoCard from "./UserInfoCard";

// ** Styles
import "@styles/react/apps/app-users.scss";
import { useQuery } from "react-query";
import { param } from "jquery";
import axiosInstance from "../../../../utility/axiosInstance";

const UserView = () => {
  const params = useParams();
  const [active, setActive] = useState("1");
  const getUser = async (id) => {
    const response = await axiosInstance.get("/admin/get/single/user/" + id);
    return response.data.data;
  };
  const { data } = useQuery(["user"], () => getUser(params.user_id), {
    onSuccess: (data) => {},
  });
  const selectedUser = data;
  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return (
    <div className="app-user-view">
      <Row>
        <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <UserInfoCard selectedUser={selectedUser && selectedUser} />
          <PlanCard />
        </Col>
        <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <UserTabs active={active} toggleTab={toggleTab} />
        </Col>
      </Row>
    </div>
  );
};
export default UserView;
