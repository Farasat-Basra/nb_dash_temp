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
import Breadcrumbs from "@components/breadcrumbs";
import DataTableOfLeads from "./newTable";
import { useFetchLeads } from "./leadsData";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllLeads, getSingleLeads } from "../../../redux/leadsUser";
import { useAppDispatch } from "../../../utility/instances";

const LeadLists = () => {
  const dispatch = useAppDispatch();
  const { leads } = useSelector((state) => state.leadsUser);
  const totalLeads = leads?.length;
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
            renderStats={<h3 className="fw-bolder mb-75">{totalLeads}</h3>}
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
      <DataTableOfLeads />
      {/* <LeadsTable
        leads={leads}
        setUncheck={setUncheck}
        uncheck={uncheck}
        selectedOption={selectedOption}
      /> */}
      {/* <Table /> */}
    </div>
  );
};

export default LeadLists;
