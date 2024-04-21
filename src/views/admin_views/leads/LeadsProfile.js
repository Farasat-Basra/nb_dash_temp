import React from "react";
import { Card, CardTitle, Col, Row } from "reactstrap";
import ProfileTabs from "./ProfileTabs";
import LeadsActivities from "./LeadsActivities";
import Breadcrumbs from "@components/breadcrumbs";
import { useQuery } from "react-query";
import axiosInstance from "../../../utility/axiosInstance";
import { useSelector } from "react-redux";

const LeadsProfile = () => {
  const { LeadsID } = useSelector((store) => store.leadsUser);
   console.log("LeadsID", LeadsID);
  const { data } = useQuery("leadsProfile", async () => {
    const response = axiosInstance.get(`/leads/single/${LeadsID}`);
    console.log("response", response);
    return response.data;
  });
  console.log("leadsProfile", data);
  return (
    <Row col="12">
      <Breadcrumbs
        title="LeadsProfile"
        data={[{ title: "Apps" }, { title: "LeadsProfile" }]}
      />
      <Col lg="4" sm="12">
        <ProfileTabs />
      </Col>
      <Col lg="8" sm="12">
        <Card className="p-2" style={{ backgroundColor: "#fff" }}>
          <CardTitle>Activities</CardTitle>
          <LeadsActivities />
        </Card>
      </Col>
    </Row>
  );
};

export default LeadsProfile;
