import { useQuery } from "react-query";
import axiosInstance from "../../../utility/axiosInstance";
import { Link } from "react-router-dom";
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Archive, FileText, MoreVertical, Trash2 } from "react-feather";
import { getUser } from "../store";
import { useState } from "react";
import { useAppDispatch } from "../../../utility/instances";
import EditUser from "../user-list/EditUserForm";
import { setLeadsID } from "../../../redux/leadsUser";
export const useFetchLeads = () => {
  return useQuery("leadsData", async () => {
    let body;
    if (!body) {
      body = { currentPage: 1, itemsPerPage: 10 };
    }
    const response = await axiosInstance.get(
      `/leads/getAllLeads?page=${body.currentPage}&limit=${body.itemsPerPage}`
    );
    console.log("res", response.data);
    const fetchedData = response.data.data.map((item) => {
      let firstName = item?.firstName ?? "N/A";
      let lastName = item?.lastName ?? " ";
      return {
        fullName: firstName + " " + lastName,
        id: item._id || "N/A",
        email: item?.email || "N/A",
        position: item?.position || "N/A",
        phoneNumber: item?.phoneNumber || "N/A",
        country: item?.country || "N/A",
        state: item?.state || "N/A",
      };
    });
    return fetchedData;
  });
};
// ** Leads Table Data
export const advSearchColumns = [
  {
    name: "Name",
    sortable: true,
    minWidth: "200px",
    selector: (row) => (
      <div>
        <Link to={`/apps/user/view/${row.id}`} className="text-secondary">
          <p>{row.fullName}</p>
        </Link>
      </div>
    ),
  },
  {
    name: "Email",
    sortable: true,
    minWidth: "250px",
    selector: (row) => row.email,
  },
  {
    name: "Role",
    sortable: true,
    minWidth: "250px",
    selector: (row) => row.position,
  },
  {
    name: "phoneNumber",
    sortable: true,
    minWidth: "150px",
    selector: (row) => row.phoneNumber,
  },
  {
    name: "country",
    sortable: true,
    minWidth: "150px",
    selector: (row) => row.country,
  },

  {
    name: "state",
    sortable: true,
    minWidth: "100px",
    selector: (row) => row.state,
  },
  {
    name: "Actions",
    minWidth: "100px",
    cell: (row) => (
      <div className="column-action">
        <ActionsOption row={row} />
      </div>
    ),
  },
];

export const ActionsOption = ({ row }) => {
  console.log("🚀 ~ ActionsOption ~ row:", row.id);
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();

  const toggle = (e) => {
    e.preventDefault();
    setShow(!show);
  };
  return (
    <UncontrolledDropdown>
      <DropdownToggle tag="div" className="btn btn-sm">
        <MoreVertical size={14} className="cursor-pointer" />
      </DropdownToggle>
      <DropdownMenu>
        <Link to={`/apps/leadsProfile/${row.id}`}>
          <DropdownItem className="w-100">
            <FileText size={14} className="me-50" />
            <span className="align-middle">Details</span>
          </DropdownItem>
        </Link>
        {/* <DropdownItem tag="a" href="/" className="w-100">
          <div onClick={toggle}>
            <EditUser setShow={setShow} show={show} />
          </div>
        </DropdownItem>
        <DropdownItem
          tag="a"
          href="/"
          className="w-100"
          onClick={(e) => {
            e.preventDefault();
            store.dispatch(deleteUser(row.id));
          }}
        >
          <Trash2 size={14} className="me-50" />
          <span className="align-middle">Delete</span>
        </DropdownItem> */}
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};
