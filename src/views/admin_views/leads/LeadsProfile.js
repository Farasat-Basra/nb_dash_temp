import React from "react";
import { Card, CardTitle, Col, Row } from "reactstrap";
import ProfileTabs from "./ProfileTabs";
import LeadsActivities from "./LeadsActivities";
import Breadcrumbs from "@components/breadcrumbs";
import { useQuery } from "react-query";
import axiosInstance from "../../../utility/axiosInstance";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const LeadsProfile = () => {
  const { LeadsID } = useSelector((store) => store.leadsUser);
  const { data, isLoading, isError } = useQuery("leadsProfile", async () => {
    try {
      const response = await axiosInstance.get(`/leads/${LeadsID}`);
      console.log("data", response.data);
      response && toast.success("Data fetched successfully");
      return response.data;
    } catch (error) {
      isError && toast.error("Something went wrong");
    }
  });

  return (
    <Row col="12">
      <Breadcrumbs
        title="LeadsProfile"
        data={[{ title: "Apps" }, { title: "LeadsProfile" }]}
      />
      <Col lg="4" sm="12">
        <ProfileTabs data={data} />
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
