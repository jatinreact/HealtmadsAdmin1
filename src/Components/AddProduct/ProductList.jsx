import React, { useState, useEffect } from "react";
import HOC from "../../Common/Hoc";
import { getBaseUrl } from "../utils";
//material ui data table
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import { Button, Grid, Card } from "@material-ui/core";
import Expand from "react-expand-animated";
import axios from "axios";
import { blankValidator, showNotificationMsz } from "../utils/Validation";
import Loder from "../Loder/Loder";

function AddProduct(props) {
  const [getaproductdata, setgetaproductdata] = useState([]);

  const [addMangeopen, setaddMangeopen] = useState(false);
  const [isupdated, setisupdated] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const deleteproduct = (row) => {
    let id = row._id;

    let url = getBaseUrl() + `deleteProduct/${id}`;
    axios
      .get(url)
      .then(
        (res) => {
          console.log("data response:::", res);
          setisupdated(!isupdated);
          showNotificationMsz(res.data.msg, "success");
        },

        (error) => {
          console.log("data response error:::", error);
          showNotificationMsz(error, "danger");
        }
      )
      .catch((e) => {
        console.log("data response error:::", e);
        showNotificationMsz(e, "danger");
      });
  };

  // ///edit array

  // const editproduct = () => {
  //   let url = getBaseUrl() + "editProduct/id";

  //   let temp = {};
  //   axios
  //     .post(url, temp)
  //     .then(
  //       (res) => {
  //         console.log("data response:::", res);
  //         showNotificationMsz(res.data.msg, "success");
  //       },

  //       (error) => {
  //         console.log("data response error:::", error);
  //         showNotificationMsz(error, "danger");
  //       }
  //     )
  //     .catch((e) => {
  //       console.log("data response error:::", e);
  //       showNotificationMsz(e, "danger");
  //     });
  // };

  useEffect(() => {
    try {
      let url = getBaseUrl() + "getAllProduct";
      axios.get(url).then(
        (res) => {
          setgetaproductdata(res.data.data);

          console.log("res ", res);
        },
        (error) => {}
      );
    } catch (error) {}
  }, [isupdated]);

  return (
    <>
      <div className="content_padding_home mt-4">
        <div className="container user_data mt-5 mb-2 ml-4 ">
          <h5
            className="hover_cursor product_cursor"
            onClick={() =>
              props.history.push("/addProduct", {
                PageType: "add",
              })
            }
          >
            <i className="fa fa-plus mr-1" />
            Add Product
          </h5>
        </div>
        <div className="table_foramtitng  mt-1 mb-2 col-md-12 table_class">
          <TableContainer>
            <Table
              className=""
              aria-label="customized table"
              id="table_outside_border"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left" className="table_header">
                    Product Image
                  </StyledTableCell>
                  <StyledTableCell align="left" className="table_header">
                    Add Description
                  </StyledTableCell>
                  <StyledTableCell align="center" className="table_header">
                    Add Price
                  </StyledTableCell>

                  <StyledTableCell align="left" className="table_header">
                    Brand
                  </StyledTableCell>

                  <StyledTableCell align="left" className="table_header">
                    Title
                  </StyledTableCell>
                  <StyledTableCell align="left" className="table_header">
                    Item Catagories
                  </StyledTableCell>
                  <StyledTableCell align="left" className="table_header">
                    Pack Size
                  </StyledTableCell>
                  <StyledTableCell align="left" className="table_header">
                    City of Origin
                  </StyledTableCell>

                  <StyledTableCell align="left" className="table_header">
                    Action
                  </StyledTableCell>
                  {/* <StyledTableCell align="right" className="table_header">
                    More
                  </StyledTableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {getaproductdata.map((row) => (
                  <StyledTableRow>
                    <StyledTableCell align="left">
                      <div>
                        {row.productPictures.slice(0, 1).map((item) => (
                          <img
                            src={getBaseUrl() + `${item.path}`}
                            alt=""
                            style={{ height: "50px", width: "50px" }}
                          />
                        ))}
                      </div>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.description}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.price}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.category}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.title}</StyledTableCell>

                    <StyledTableCell align="left">
                      {row.itemCategory}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.pack_size}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.country_origin}
                    </StyledTableCell>

                    <StyledTableCell align="left">
                      <div className="d-flex">
                        <button
                          type="button"
                          class="btn btn-info mr-4"
                          onClick={() =>
                            props.history.push("/addProduct", {
                              PageType: "Edit",
                              data: row,
                            })
                          }
                        >
                          <i class="fa fa-edit mr-1"></i>Edit
                        </button>

                        <button
                          type="button"
                          class="btn btn-info mr-4"
                          onClick={() => deleteproduct(row)}
                        >
                          <i class="fa fa-trash mr-1"></i>Delete
                        </button>

                        <span
                          className="btn_class_color pl-2"
                          onClick={() =>
                            props.history.push("/addmore", {
                              id: row._id,
                            })
                          }
                        >
                          Add more
                        </span>
                      </div>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
}
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default HOC(AddProduct);
