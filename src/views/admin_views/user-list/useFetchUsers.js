import { useQuery } from "react-query";
import axiosInstance from "../../../utility/axiosInstance";
import { useEffect, useState } from "react";
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
  const FetchData = async () => {
    const response = await axiosInstance.get("/admin/get/all/users");
    const fetchedData = response.data.data.map((item) => {
      let firstName = item?.firstName ?? "N/A";
      let lastName = item?.lastName ?? " ";
      return {
        fullName: firstName + " " + lastName,
        id: item.id || "N/A",
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
  },[])
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
  ];