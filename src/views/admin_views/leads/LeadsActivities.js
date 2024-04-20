import React from "react";
import { EmailTableSetting, NotesSvg, SettingList, TimelineSvg } from "../../../utility/Svgs";
import { Button, Card, Col, Input, Row } from "reactstrap";
import profileImg from "@src/assets/images/portrait/small/avatar-s-11.jpg";
import Avatar from "@components/avatar";

const LeadsActivities = () => {
  const arr = [1, 2];
  const activity = [
    {
      date: "14 Dec 2023",
      name: "Contact Created",
    },
    {
      date: "15 Dec 2023",
      name: "Contact Verified: Valid",
    },
    {
      date: "16 Dec 2023",
      name: "Contact Number Changed: +50 123 4567",
    },
  ];
  return (
    <>
      <Row>
        <Col lg="6" sm="12">
          <div className="border-top py-1 d-flex items-center gap-1">
            <span>
              <NotesSvg />
            </span>
            <span className="fs-4">Notes</span>
          </div>
          <div className="border rounded">
            <Input
              type="textarea"
              name="text"
              id="exampleText"
              rows="3"
              placeholder=""
            />
            <div className="py-1 ps-1 d-flex gap-1 border-top border-2 mt-1">
              <button
                className="bg-primary text-center text-white p-1 rounded border-0 outline-none"
                style={{
                  width: "8rem",
                  height: "3.2rem",
                }}
              >
                +Add Note
              </button>
              <button
                className="border p-1 rounded"
                style={{
                  backgroundColor: "#fff",
                  width: "8rem",
                  height: "3.4rem",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
          <div className="mt-2">
            {arr.map(() => (
              <div className="d-flex gap-2 shadow mt-2">
                <TimelineSvg />
                <Card className="p-1" style={{ backgroundColor: "#fff" }}>
                  <div
                    className="d-flex    justify-content-between"
                    style={{ width: "24rem" }}
                  >
                    <div className="d-flex align-items-center">
                      <Avatar
                        className="me-1"
                        img={profileImg}
                        imgHeight="42"
                        imgWidth="42"
                      />
                      <div className="d-flex flex-column">
                        <span style={{ fontWeight: "600" }}>
                          Usama Ghazanfar
                        </span>
                        <span>14 Dec 2023</span>
                      </div>
                    </div>
                    <div>
                      <EmailTableSetting />
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </Col>
        <Col lg="6" sm="12">
         
          <div className="d-flex   gap-2 mt-2">
            <TimelineSvg />
            <div className="d-flex flex-column gap-2">
              {activity.map((item) => (
                <div className="d-flex flex-column">
                  <span>{item.date}</span>
                  <span style={{ fontWeight: "600" }}>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default LeadsActivities;
