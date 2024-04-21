import { useQuery } from "react-query";
import axiosInstance from "../../../utility/axiosInstance";
import { Link } from "react-router-dom";
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
        id: item.id || "N/A",
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
];
