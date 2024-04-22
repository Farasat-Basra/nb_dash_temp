import { useQuery } from "react-query";
import axiosInstance from "../../../utility/axiosInstance";
import { useEffect, useState } from "react";

// ** Reactstrap Imports
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Archive, FileText, MoreVertical, Trash2 } from "react-feather";
import { getUser } from "../store";
import { Link, useNavigate, useParams } from "react-router-dom";
import EditUser from "./EditUserForm";
import { useAppDispatch } from "../../../utility/instances";
import { setUserID } from "../../../redux/userSlice";
import DeleteUser from "./DeleteModal";
// ** custom useQuery hook
export const useFetchUsers = () => {
  return useQuery("usersData", async () => {
    const response = await axiosInstance.get("/admin/get/all/users");
    const fetchedData = response.data.data.map((item) => {
      let firstName = item?.firstName ?? "N/A";
      let lastName = item?.lastName ?? " ";
      return {
        fullName: firstName + " " + lastName,
        id: item._id || "N/A",
        email: item?.email || "N/A",
        role: item?.role,
        phoneNumber: item?.phoneNumber || "N/A",
        country: item?.country || "N/A",
        state: item?.state || "N/A",
      };
    });
    return fetchedData;
  });
};

// ** custom hook with useEffect
// export function useFetchUsers() {
//   const [data, setData] = useState([]);
//   const dispatch = useAppDispatch();

//   const FetchData = async () => {
//     const response = await axiosInstance.get("/admin/get/all/users");
//     const fetchedData = response.data.data.map((item) => {
//       let firstName = item?.firstName ?? "N/A";
//       let lastName = item?.lastName ?? " ";
//       return {
//         fullName: firstName + " " + lastName,
//         id: item._id || "N/A",
//         email: item?.email || "N/A",
//         role: item?.role,
//         phoneNumber: item?.phoneNumber || "N/A",
//         country: item?.country || "N/A",
//         state: item?.state || "N/A",
//       };
//     });
//     setData(fetchedData);
//   };
//   useEffect(() => {
//     FetchData();
//   }, []);
//   return data;
// }

// ** user Table Data
export const advSearchColumns = [
  {
    name: "Name",
    sortable: true,
    minWidth: "200px",
    selector: (row) => row.fullName,
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
    selector: (row) => row.role,
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
  const [show, setShow] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const toggle = (e) => {
    e.preventDefault();
    // navigate(`/admin/user/list/${row.id}`);
    setShow(!show);
  };
  const DeleteToggleModal = () => {
    setDeleteModal(!deleteModal);
  };
  return (
    <UncontrolledDropdown>
      <DropdownToggle tag="div" className="btn btn-sm">
        <MoreVertical size={14} className="cursor-pointer" />
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem tag={Link} className="w-100">
          <FileText size={14} className="me-50" />
          <span className="align-middle">Details</span>
        </DropdownItem>
        <DropdownItem className="w-100">
          <div onClick={toggle}>
            <EditUser setShow={setShow} show={show} id={row.id} />
          </div>
        </DropdownItem>
        <DropdownItem
          className="w-100"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <div onClick={DeleteToggleModal}>
            <DeleteUser
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
