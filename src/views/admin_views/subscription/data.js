// ** Reactstrap Imports
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Archive, FileText, Link, MoreVertical, Trash2 } from "react-feather";
import { useAppDispatch } from "../../../utility/instances";
import { useQuery } from "react-query";
import axiosInstance from "../../../utility/axiosInstance";
import { useState } from "react";
import { setUserID } from "../../../redux/userSlice";
import EditUser from "../user-list/EditUserForm";

// fetching all subscriptions
export const useFetchSubscriptions = () => {
  return useQuery("subscriptionsData", async () => {
    const response = await axiosInstance.get(
      "/admin/get/all/subscription/plan"
    );
    console.log(response.data.data);
    const fetchedData = response.data.data.map((item) => {
      let firstName = item?.firstName ?? "N/A";
      let lastName = item?.lastName ?? " ";
      return {
        amount: item.amount || "N/A",
        status: item.status || "N/A",
        expiryDate: item.expiryDate || "N/A",
        createdAt: item.createdAt || "N/A",
        updatedAt: item.updatedAt || "N/A",
      };
    });
    return fetchedData;
  });
};

// ** user Table Data
export const advSearchColumns = [
  {
    name: "Amount",
    sortable: true,
    minWidth: "200px",
    selector: (row) => ` $  ${row.amount}`,
  },
  {
    name: "Status",
    sortable: true,
    minWidth: "250px",
    selector: (row) => (
      <div>
        {row.status === "active" ? (
          <Badge pill color="success" className="me-1">
            Active
          </Badge>
        ) : (
          <Badge pill color="danger" className="me-1">
            Inactive
          </Badge>
        )}
      </div>
    ),
  },
  {
    name: "ExpiryDate",
    sortable: true,
    minWidth: "250px",
    selector: (row) => row.expiryDate,
  },
  {
    name: "CreatedAt",
    sortable: true,
    minWidth: "150px",
    selector: (row) => row.createdAt,
  },
  {
    name: "UpdatedAt",
    sortable: true,
    minWidth: "150px",
    selector: (row) => row.updatedAt,
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
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();

  const toggle = (e) => {
    e.preventDefault();
    setShow(!show);
  };
  return (
    <UncontrolledDropdown>
      <DropdownToggle tag="div" className="btn btn-sm">
        <MoreVertical
          size={14}
          className="cursor-pointer"
          onClick={() => dispatch(setUserID(row.id))}
        />
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem
          tag={Link}
          className="w-100"
          to={`/apps/user/view/${row.id}`}
          onClick={() => store.dispatch(getUser(row.id))}
        >
          <FileText size={14} className="me-50" />
          <span className="align-middle">Details</span>
        </DropdownItem>
        <DropdownItem tag="a" href="/" className="w-100">
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
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};
