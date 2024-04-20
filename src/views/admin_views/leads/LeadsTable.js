// ** other imports
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Card, Input, Row, Spinner, Table } from "reactstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { ChevronLeft, ChevronRight } from "react-feather";

//** local imports
import { setAllSelectedLeads, setSelectedLeads } from "../../../redux/leadsUser";

// ** function body
const LeadsTable = ({ leads, uncheck, setUncheck }) => {
  // ** states
  const [tableLoading, setTableLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // ** redux states
  const { selectedLeads, leadsPagination } = useSelector( (store) => store.leadsUser);
  const { renderColumns } = useSelector((store) => store.leadsUser);

  // ** instances
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const handlePageClick = (page) => {
  //   setCurrentPage(page);
  //   params.LeadsId
  //     ? dispatch(
  //         getLeads({
  //           ...leadsPagination,
  //           currentPage: page,
  //           id: params.LeadsId,
  //         })
  //       )
  //     : dispatch(getAllLeads({ ...leadsPagination, currentPage: page }));
  // };

  // ** fetching Data
  useEffect(() => {
    setTimeout(() => {
      setTableLoading(false);
    }, 2000);
  }, []);
  useEffect(() => {
    setCurrentPage(leadsPagination?.currentPage || 1);
    setTotalPages(leadsPagination?.totalPages || 1);
  }, [leadsPagination]);

  const filterLeads = leads?.slice(0, parseInt(selectedLeads.value, 10));
  // console.log("filterLeads", filterLeads);

  const headers = [
    {
      name: "NAME",
    },
    {
      name: "EMAIL",
    },
    {
      name: "STATUS",
    },
    {
      name: "PHONE",
    },
    {
      name: "Action",
    },
    {
      name: "CURRENT LOCATION",
    },
    {
      name: "TITLE",
    },
    {
      name: "COMPANY NAME",
    },
    {
      name: "EMPLOYEES",
    },
    {
      name: "WEBSITE",
    },
    {
      name: "INDUSTRY",
    },
    {
      name: "TAG",
    },
  ];

  const checkedHandle = (e, tags, index) => {
    const { value, checked } = e.target;
    setUncheck({ ...uncheck, [index]: !uncheck[index] });
    dispatch(setSelectedLeads({ value, checked, tags }));
  };
  const handleSelectAll = (e) => {
    const { value, checked } = e.target;
    const checkedIndexes = {};
    if (checked) {
      const leadsIds = leads.map((item, index) => {
        checkedIndexes[index] = true;
        return item._id;
      });
      setUncheck({ checked: !uncheck.checked, ...checkedIndexes, value });
      dispatch(setAllSelectedLeads({ leadsIds }));
    } else {
      dispatch(setAllSelectedLeads({ leadsIds: [] }));
      setUncheck({ checked: !uncheck.checked });
    }
  };
  // console.log("%c selectedLeads ID", "color: orange");

  const renderPaginationItems = () => {
    const items = [];
    const maxPagesToShow = 5;

    for (let page = 1; page <= totalPages; page++) {
      if (
        page === 1 ||
        page === totalPages ||
        Math.abs(currentPage - page) < maxPagesToShow / 2
      ) {
        items.push(
          <PaginationItem key={page} active={page === currentPage}>
            {/* <PaginationLink onClick={() => handlePageClick(page)}>
              {page}
            </PaginationLink> */}
          </PaginationItem>
        );
      } else if (items[items.length - 1] !== "...") {
        // Insert ellipsis if not already present
        items.push(
          <PaginationItem key={page} disabled>
            <PaginationLink>...</PaginationLink>
          </PaginationItem>
        );
      }
    }

    return items;
  };

  const underScoreToCapitalize = (value) =>{
    const status = value.split("_").map((item) =>(
      item.charAt(0).toUpperCase() + item.slice(1))).join(" ");
    return status;
  }

const handleBadgeColor = (item) => {
  return(
    item === item.risky && "light-secondary",
    item === item.invalid_email && "light-danger",
    item === item.verified && "light-success"
  )
}

  return (
    <div
      style={{
        height: "34rem",
        overflow: "auto",
      }}
    >
      <Card className="" style={{ backgroundColor: "#fff" }}>
        <Row className="pt-1 mx-0">
          <div className="d-flex justify-content-end">
            <div className="d-flex   pe-1" style={{ paddingLeft: "5px" }}>
              <Input
                className="dataTable-filter mb-50"
                type="text"
                bsSize="sm"
                id="search-input"
                placeholder="Search Leads"
              />
            </div>
          </div>
          <div className="">
            <Table responsive className="overflow-x-auto">
              <thead className="overflow-x-auto">
                <tr>
                  <th style={{ backgroundColor: "#fff" }}>
                    <Input
                      type="checkbox"
                      onChange={(e) => handleSelectAll(e)}
                      checked={uncheck?.checked}
                    />
                  </th>
                  {headers
                    .filter((item) =>
                      renderColumns
                        .map((item) => item.label.toLowerCase())
                        .includes(item.name.toLowerCase())
                    )
                    .map((item, index) => (
                      <th
                        key={index}
                        style={{
                          backgroundColor: "#fff",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.name}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
               
                {tableLoading ? (
                  <tr>
                    <td
                      colSpan={headers.length + 1}
                      style={{
                        paddingTop: "100px",
                        paddingBottom: "260px",
                        backgroundColor: "#fff",
                      }}
                    >
                      <div className="d-flex justify-content-center align-items-center">
                        <Spinner
                          className="text-primary"
                          style={{ width: "4rem", height: "4rem" }}
                        />
                      </div>
                    </td>
                  </tr>
                ) : (
                  leads
                    // .slice(0, parseInt(leadsPagination?.itemsPerPage, 10))
                    ?.map((item, index) => (
                      <tr
                        key={item._id}
                        className="cursor-pointer"
                        // onClick={() =>
                        //   navigate(`/apps/leadsDetail/${item._id}`)
                        // }
                      >
                        <td style={{ backgroundColor: "#fff" }}>
                          <Input
                            type="checkbox"
                            checked={uncheck[index]}
                            value={item._id}
                            onChange={(e) => checkedHandle(e, item.tags, index)}
                          />
                        </td>
                        {renderColumns
                          .map((item) => item.value)
                          .includes("Name") && (
                          <td style={{ backgroundColor: "#fff" }}>
                            <Link
                              to={`/apps/leadsDetail/${item._id}`}
                              className="text-secondary cursor-pointer"
                            >
                              {item.firstName +  " " + item.lastName }
                              
                            </Link> 
                          </td>
                        )}
                        {/* {renderColumns
                          .map((item) => item.value)
                          .includes("lastName") && (
                          <td style={{ backgroundColor: "#fff" }}>
                            <Link
                              to={`/apps/leadsDetail/${item._id}`}
                              className="text-secondary cursor-pointer"
                            >
                              {item.lastName}
                            </Link>
                          </td>
                        )} */}
                        {renderColumns
                          .map((item) => item.value)
                          .includes("email") && (
                          <td className="" style={{ backgroundColor: "#fff" }}>
                            <Link
                              to={`/apps/leadsDetail/${item._id}`}
                              className="text-secondary cursor-pointer"
                            >
                              {item.email}
                            </Link>
                          </td>
                        )}
                        {renderColumns
                          .map((item) => item.value)
                          .includes("email") && (
                          <td className="" style={{ backgroundColor: "#fff" }}>
                            <Link
                              to={`/apps/leadsDetail/${item._id}`}
                              className="text-secondary cursor-pointer"
                            >
                              <Badge color={
                              item.status === "un_verified" ? "light-warning" :
                              item.status === "risky" ? "light-info" :
                              item.status === "invalid_email" ? "light-danger" :
                              item.status === "valid" ? "light-success" :
                              "light-primary" 
                              }>
                                { underScoreToCapitalize(item.status)}
                              </Badge>
                            </Link>
                          </td>
                        )}
                        {renderColumns
                          .map((item) => item.value)
                          .includes("phoneNumber") && (
                          <td className="d-flex justify-content-center"  style={{ backgroundColor: "#fff",  }}>
                            <Link
                              to={`/apps/leadsDetail/${item._id}`}
                              className="text-secondary cursor-pointer"
                            >
                              {item.phoneNumber || "---" }
                            </Link>
                          </td>
                        )}
                        {/* {renderColumns
                          .map((item) => item.value)
                          .includes("action") && (
                          <td style={{ backgroundColor: "#fff" }}>
                            <Link
                              to={`/apps/leadsDetail/${item._id}`}
                              className="text-primary cursor-pointer"
                              style={{ fontWeight: "500" }}
                            >
                              View
                            </Link>
                          </td>
                        )} */}
                        {renderColumns
                          .map((item) => item.value)
                          .includes("location") && (
                          <td style={{ backgroundColor: "#fff" }}>
                            <Link
                              to={`/apps/leadsDetail/${item._id}`}
                              className="text-secondary cursor-pointer"
                            >
                              {item.location || "---" }
                            </Link>
                          </td>
                        )}
                        {renderColumns
                          .map((item) => item.value)
                          .includes("title") && (
                          <td style={{ backgroundColor: "#fff" }}>
                            <Link
                              to={`/apps/leadsDetail/${item._id}`}
                              className="text-secondary cursor-pointer"
                            >
                              {item.title}
                            </Link>
                          </td>
                        )}
                        {renderColumns
                          .map((item) => item.value)
                          .includes("companyName") && (
                          <td style={{ backgroundColor: "#fff" }}>
                            <Link
                              to={`/apps/leadsDetail/${item._id}`}
                              className="text-secondary cursor-pointer"
                            >
                              {item.companyName || "---" }
                            </Link>
                          </td>
                        )}
                        {renderColumns
                          .map((item) => item.value)
                          .includes("totalEmployees") && (
                          <td style={{ backgroundColor: "#fff" }}>
                            <Link
                              to={`/apps/leadsDetail/${item._id}`}
                              className="text-secondary cursor-pointer"
                            >
                              {item.totalEmployees || "---" }
                            </Link>
                          </td>
                        )}
                        {renderColumns
                          .map((item) => item.value)
                          .includes("website") && (
                          <td style={{ backgroundColor: "#fff" }}>
                            <Link
                              to={`/apps/leadsDetail/${item._id}`}
                              className="text-secondary cursor-pointer"
                            >
                              {item.website || "---" }
                            </Link>
                          </td>
                        )}
                        {renderColumns
                          .map((item = {}) => item.value)
                          .includes("industry") && (
                          <td style={{ backgroundColor: "#fff" }}>
                            <Link
                              to={`/apps/leadsDetail/${item._id}`}
                              className="text-secondary cursor-pointer"
                            >
                              {item.industry || "---" }
                            </Link>
                          </td>
                        )}
                        {renderColumns
                          .map((item) => item.value)
                          .includes("tag") && (
                          <>
                            <td style={{ backgroundColor: "#fff" }}>
                              <p className="d-flex gap-1">
                                {item.tags.map((item) => (
                                  <Badge color="light-primary">
                                    <Link
                                      to={`/apps/leadsDetail/${item._id}`}
                                      className="text-primary cursor-pointer"
                                    >
                                     tags
                                    </Link>
                                  </Badge>
                                ))}
                              </p>
                            </td>
                          </>
                        )}
                      </tr>
                    ))
                )}
              </tbody>
            </Table>
          </div>
          <div className="d-flex justify-content-end">
            <Pagination className="d-flex pt-1">
              <PaginationItem disabled={currentPage === 1} first>
                <PaginationLink
                  previous
                  onClick={() => handlePageClick(currentPage - 1)}
                >
                  <ChevronLeft size={15} /> Prev
                </PaginationLink>
              </PaginationItem>
              {renderPaginationItems()}

              <PaginationItem disabled={currentPage === totalPages} last>
                <PaginationLink
                  next
                  onClick={() => handlePageClick(currentPage + 1)}
                >
                  Next
                  <ChevronRight size={15} />
                </PaginationLink>
              </PaginationItem>
            </Pagination>
          </div>
        </Row>
      </Card>
    </div>
  );
};

export default LeadsTable;
