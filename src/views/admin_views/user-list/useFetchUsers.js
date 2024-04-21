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
import { Link } from "react-router-dom";
import EditUser from "./EditUserForm";
import { useAppDispatch } from "../../../utility/instances";
import { setUserID } from "../../../redux/userSlice";
// // ** custom useQuery hook
// export const useFetchUsers = () => {
//   return useQuery("usersData", async () => {
//     const response = await axiosInstance.get("/admin/get/all/users");
//     const fetchedData = response.data.data.map((item) => {
//       let firstName = item?.firstName ?? "N/A";
//       let lastName = item?.lastName ?? " ";
//       return {
//         fullName: firstName + " " + lastName,
//         id: item.id || "N/A",
//         email: item?.email || "N/A",
//         role: item?.role,
//         phoneNumber: item?.phoneNumber || "N/A",
//         country: item?.country || "N/A",
//         state: item?.state || "N/A",
//       };
//     });
//     return fetchedData;
//   }
// );
// };

// ** custom hook with useEffect
export function useFetchUsers() {
  const [data, setData] = useState([]);
  const dispatch = useAppDispatch();

  const FetchData = async () => {
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
    setData(fetchedData);
  };
  useEffect(() => {
    FetchData();
  }, []);
  return data;
}

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
  console.log("🚀 ~ ActionsOption ~ row:", row);
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
