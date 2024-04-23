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
import DeleteSubscription from "./Delete";
import EditSubscription from "./EditSubscription";

export const endpoint = "/admin/get/all/subscription/plan";
// fetching all subscriptions
export const useFetchSubscriptions = () => {
  return useQuery(endpoint, async () => {
    const response = await axiosInstance.get(endpoint);
    const fetchedData = response.data.data.map((item) => {
      let firstName = item?.firstName ?? "N/A";
      let lastName = item?.lastName ?? " ";
      return {
        id: item._id || "N/A",
        amount: item.amount || "N/A",
        name: item.name || "N/A",
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
    name: "Name",
    sortable: true,
    minWidth: "200px",
    selector: (row) => row.name ?? "N/A",
  },
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
  // {
  //   name: "UpdatedAt",
  //   sortable: true,
  //   minWidth: "150px",
  //   selector: (row) => row.updatedAt,
  // },
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
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();

  const toggle = (e) => {
    e.preventDefault();
    setShow(!show);
  };
  const DeleteToggleModal = () => {
    setDeleteModal(!deleteModal);
  };
  const EditToggleModal = () => {
    setUpdateModal(!deleteModal);
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
          // onClick={() => store.dispatch(getUser(row.id))}
        >
          <FileText size={14} className="me-50" />
          <span className="align-middle">Details</span>
        </DropdownItem>
        <DropdownItem
          className="w-100"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <div onClick={EditToggleModal}>
            <EditSubscription
              setShow={setUpdateModal}
              show={updateModal}
              toggle={EditToggleModal}
              id={row.id}
            />
          </div>
        </DropdownItem>
        <DropdownItem
          className="w-100"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <div onClick={DeleteToggleModal}>
            <DeleteSubscription
              setShow={setDeleteModal}
              show={deleteModal}
              id={row.id}
            />
          </div>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};
