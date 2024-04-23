import React from "react";
import { Card, CardTitle, Col, Row } from "reactstrap";
import ProfileTabs from "./ProfileTabs";
import LeadsActivities from "./LeadsActivities";

const LeadsViewProfile = () => {
  return (
    <Row col="12">
      <Col lg="4" sm="12">
        <ProfileTabs />
      </Col>
      <Col lg="8" sm="12">
       <Card className="p-2" style={{backgroundColor:"#fff"}}>
        <CardTitle>
            Activities
        </CardTitle>
        <LeadsActivities />
       </Card>
      </Col>
    </Row>
  );
};

export default LeadsViewProfile;
