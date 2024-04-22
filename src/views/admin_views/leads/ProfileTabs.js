import React, { useEffect, useState } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Row,
  Col,
} from "reactstrap";
import { LeftArrow, NextIcon, PreviousIcon, RightArrow } from "../../../utility/Svgs";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Company, Contact, Details } from "./ProfileTabsContent";
import { getSingleLeads } from "../../../redux/leadsUser";

const ProfileTabs = ({ data }) => {
  console.log("profielTabdata", data)
  const [active, setActive] = useState("1");
  // const dispatch = useDispatch();
  // const params = useParams();
  // const { singleLeads } = useSelector((store) => store.leadsUser);

  // useEffect(() => {
  //   dispatch(getSingleLeads({ id: params.SingleLeadId }));
  // }, []);

  // console.log(singleLeads);

  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return (
    <React.Fragment>
      <Card className="px-2 pt-3" style={{ backgroundColor: "#fff" }}>
        <Row className="d-flex justify-content-between ">
          <Col sm="12" lg="6">
            <div className="d-flex gap-1 align-items-center">
              <Link to="/apps/lead">
              <LeftArrow />
              </Link>
              <span className="fs-5 ">List Number 10</span>
            </div>
          </Col>
          <Col sm="12" lg="6">
            <div className="d-flex justify-content-end   gap-1">
              <p
                className="d-flex align-items-center gap-1"
                style={{ fontWeight: "500" }}
              >
                <PreviousIcon />
                <span>
                  2 of
                  <strong
                    className="text-primary"
                    style={{ paddingLeft: "5px" }}
                  >
                    120 Leads
                  </strong>
                </span>

                <RightArrow />
              </p>
            </div>
          </Col>
        </Row>

        <Nav tabs fill>
          <NavItem>
            <NavLink
              active={active === "1"}
              onClick={() => {
                toggle("1");
              }}
            >
              Contact
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={active === "2"}
              onClick={() => {
                toggle("2");
              }}
            >
              Company
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={active === "3"}
              onClick={() => {
                toggle("3");
              }}
            >
              Other Details
            </NavLink>
          </NavItem>
          {/* <NavItem>
            <NavLink
              active={active === "4"}
              onClick={() => {
                toggle("4");
              }}
            >
              Settings
            </NavLink>
          </NavItem> */}
        </Nav>
        <TabContent className="py-50" activeTab={active}>
          <TabPane tabId="1">
            <Contact data={data} />
          </TabPane>
          <TabPane tabId="2">
            <Company data={data}  />
          </TabPane>
          <TabPane tabId="3">
            <Details data={data} />
          </TabPane>
          <TabPane tabId="4">
            <p>
              Candy canes halvah biscuit muffin dessert biscuit marzipan. Gummi
              bears marzipan bonbon chupa chups biscuit lollipop topping. Muffin
              sweet apple pie sweet roll jujubes chocolate. Topping cake chupa
              chups chocolate bar tiramisu tart sweet roll chocolate cake.
            </p>
            <p>
              Jelly beans caramels muffin wafer sesame snaps chupa chups
              chocolate cake pastry halvah. Sugar plum cotton candy macaroon
              tootsie roll topping. Liquorice topping chocolate cake tart
              tootsie roll danish bear claw. Donut candy canes marshmallow.
              Wafer cookie apple pie.
            </p>
          </TabPane>
        </TabContent>
      </Card>
    </React.Fragment>
  );
};
export default ProfileTabs;
