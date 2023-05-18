import React, { useState, useEffect } from "react";
import "./UserTable.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";

import axios from "axios";

const UserTable = ({ setCount }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sort, setSort] = useState("asc");

  useEffect(() => {
    axios
      .get("http://localhost:3220/accounts")
      .then((response) => {
        setData(response.data);
        setCount(response.data.length);
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, filteredData.length - page * rowsPerPage);

  function forSearch(e) {
    let text = e.target.value;

    if (!text) {
      setData(filteredData);
      console.log(filteredData);
    } else {
      let filterd = data.filter((user) => {
        return (
          user.email
            .toString()
            .toLowerCase()
            .includes(text.toString().toLowerCase()) ||
          user.name
            .toString()
            .toLowerCase()
            .includes(text.toString().toLowerCase())
        );
      });
      setData(filterd);
    }
  }

  function forSort(col) {
    if (sort === "asc") {
      const sorted = [...data].sort((a, b) =>
        a[col].toString().toLowerCase() > b[col].toString().toLowerCase()
          ? 1
          : -1
      );
      setData(sorted);
      setSort("dsc");
    }
    if (sort === "dsc") {
      const sorted = [...data].sort((a, b) =>
        a[col].toString().toLowerCase() < b[col].toString().toLowerCase()
          ? 1
          : -1
      );
      setData(sorted);
      setSort("asc");
    }
  }

  return (
    <div className="container-md ">
      <div className="container-fluid">
        <TextField
          onChange={forSearch}
          id="outlined-basic"
          label="Search"
          variant="outlined"
          className="w-100"
          sx={{
            width: "100%",
            marginTop: "10px",
          }}
        />
      </div>

      <div className="row">
        <div className="col-md">
          <div className="table-responsive">
            <Table
              className="table table-striped table-responsive"
              aria-label="customer table"
              sx={{ minWidth: 500, marginTop: "20px" }}
            >
              <TableHead className="table-head ">
                <TableRow className="table-head-row">
                  <TableCell onClick={() => forSort("name")}>
                    <span className="table-cell-head fw-bold d-flex justify-content-center">
                      Name{" "}
                      {sort === "asc" ? (
                        <i className="bi bi-arrow-down"></i>
                      ) : (
                        <i className="bi bi-arrow-up"></i>
                      )}{" "}
                    </span>
                  </TableCell>
                  <TableCell onClick={() => forSort("email")}>
                    <span className="table-cell-head fw-bold d-flex justify-content-center">
                      Email{" "}
                      {sort === "asc" ? (
                        <i className="bi bi-arrow-down"></i>
                      ) : (
                        <i className="bi bi-arrow-up"></i>
                      )}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="table-cell-head fw-bold d-flex justify-content-center">
                      Gender
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="table-cell-head fw-bold d-flex justify-content-center">
                      Number{" "}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="table-cell-head fw-bold d-flex justify-content-center">
                      Address
                    </span>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? data.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : data
                ).map((user) => (
                  <TableRow key={user.email}>
                    <TableCell className="fw-bold">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.gender}</TableCell>
                    <TableCell>{user.mobile}</TableCell>
                    <TableCell>{user.address}</TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              inputProps: {
                "aria-label": "rows per page",
              },
              native: true,
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
    </div>
  );
};

export default UserTable;
