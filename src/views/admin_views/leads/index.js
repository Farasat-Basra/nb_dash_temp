// ** User List Component

// ** Reactstrap Imports
import { Row, Col } from "reactstrap";

// ** Custom Components
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";

// ** Icons Imports
import { User, UserPlus, UserCheck, UserX } from "react-feather";

// ** Styles
import "@styles/react/apps/app-users.scss";
import Table from "../../apps/roles-permissions/roles/Table";
import { MdOutlineLeaderboard } from "react-icons/md";
import LeadsTable from "./LeadsTable";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllLeads } from "../../../redux/leadsUser";
import Breadcrumbs from '@components/breadcrumbs'

const LeadLists = () => {
  const iconOptions = [
    {
      options: [
        {
          value: "10",
          label: "10",
          // icon:Folder ,
        },
        {
          value: "20",
          label: "20",
          // icon: Folder,
        },
        {
          value: "30",
          label: "30",
          // icon: Folder,
        },
        {
          value: "40",
          label: "40",
          // icon: Folder,
        },
        {
          value: "50",
          label: "50",
          // icon: Folder,
        },
        {
          value: "100",
          label: "100",
          // icon: Folder,
        },
        {
          value: "200",
          label: "200",
          // icon: Folder,
        },
      ],
    },
  ];

  // ** instances
  const dispatch = useDispatch();

  // ** states
  const [uncheck, setUncheck] = useState([]);
  const [selectedOption, setSelectedOption] = useState(
    iconOptions[0].options[0]
  );

  // ** getting states from redux
  const {
    leads,
    loading: isLoading,
    tagLists,
  } = useSelector((store) => store.leadsUser);

  // ** fetching data on Mount
  useEffect(() => {
    dispatch(getAllLeads());
  }, []);
  return (
    <div className="app-user-list">
      <Breadcrumbs
        title="Leads"
        data={[{ title: "Apps" }, { title: "Leads" }]}
      />

      <Row>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="primary"
            statTitle="Total Leads"
            icon={<MdOutlineLeaderboard size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">21,459</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="danger"
            statTitle="Single Leads"
            icon={<MdOutlineLeaderboard size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">4,567</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="success"
            statTitle="Bulk Leads"
            icon={<MdOutlineLeaderboard size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">19,860</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="warning"
            statTitle="Recent Created Leads"
            icon={<MdOutlineLeaderboard size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">237</h3>}
          />
        </Col>
      </Row>
      <LeadsTable
        leads={leads}
        setUncheck={setUncheck}
        uncheck={uncheck}
        selectedOption={selectedOption}
      />
      {/* <Table /> */}
    </div>
  );
};

export default LeadLists;
