import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import HOC from "../../Common/Hoc";
import axios from "axios";
import Expand from "react-expand-animated";
import { getBaseUrl } from "../utils";
//loader
import Loder from "../Loder/Loder";

//dialog box
import {
  Grid,
  Card,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function Brand(props) {
  const classes = useStyles();
  const [EditDailogOpen, setEditDailogOpen] = useState(false);
  const [isupdated, setisupdated] = useState(false);
  const [isloading, setisloading] = useState(false);
  ////dialogbox
  const [opendialogbox, setopendialogbox] = useState(false);

  const [addbrand, setaddbrand] = useState("");
  const [brandimage, setbrandimage] = useState(null);
  const [radiovalue, setradiovalue] = useState("Yes");

  ///edit brand

  const [Editaddbrand, setEditaddbrand] = useState("");
  const [Editbrandimage, setEditbrandimage] = useState(null);
  const [Editradiovalue, setEditradiovalue] = useState("Yes");
  const [EditId, setEditId] = useState("");

  const radioHandler = (event) => {
    setradiovalue(event.target.value);
    console.log("radiobtn", event.target.value);
  };

  //handle click  for radio button
  const EditradioHandler = (event) => {
    setEditradiovalue(event.target.value);
    console.log("radiobtn", event.target.value);
  };

  const editBeandData = (row) => {
    setEditDailogOpen(!EditDailogOpen);
    setEditaddbrand(row.name);
    setEditbrandimage(row.image);
    setEditradiovalue(row.featured_brand);
    setEditId(row._id);
  };

  ////brand post first
  const addsubcategries = () => {
    if (brandimage === null || brandimage === "") {
      alert("Choose the image");
      return;
    }
    let url = getBaseUrl() + "addBrand";
    setisloading(true);

    const fd = new FormData();

    fd.append("name", addbrand);
    fd.append("featured_brand", radiovalue);

    //********* HERE IS THE CHANGE ***********

    fd.append("myField", brandimage);

    axios
      .post(url, fd)
      .then(
        (res) => {
          console.log("data categriesfield:::", res);
          setisupdated(!isupdated);
          setaddbrand("");
          setbrandimage(null);
          setopendialogbox(!opendialogbox);
        },

        (error) => {
          console.log("data response categriesfield:::", error);
        }
      )
      .catch((e) => {
        console.log("data response categriesfield:::", e);
      });
  };

  //get api

  /// get api order
  const [brandproduct, setbrandproduct] = useState([]);

  useEffect(() => {
    try {
      let url = getBaseUrl() + "viewBrand";
      setisloading(true);
      axios.get(url).then(
        (res) => {
          setbrandproduct(res.data);
          console.log("datagetbyadmin:::", res);
          setisloading(false);
        },
        (error) => {
          setisloading(false);
        }
      );
    } catch (error) {
      setisloading(false);
    }
  }, [isupdated]);

  /// delete banner

  const deletebrand = (item) => {
    let id = item._id;

    let url = getBaseUrl() + `deleteBrand/${id}`;

    axios
      .get(url)
      .then(
        (res) => {
          console.log("data deletebrand:::", res);
          setisupdated(!isupdated);
          setisloading(false);
        },

        (error) => {
          setisloading(false);
          console.log("data response error:::", error);
        }
      )
      .catch((e) => {
        setisloading(false);
        console.log("data response error:::", e);
      });
  };

  ////edit  brand
  const editbranddata = (ID) => {
    const id = ID;
    setisloading(true);
    let url = getBaseUrl() + `editBrand/${id}`;

    const fd = new FormData();

    fd.append("name", Editaddbrand);
    fd.append("featured_brand", Editradiovalue);

    //********* HERE IS THE CHANGE ***********

    fd.append("myField", Editbrandimage);

    axios
      .post(url, fd)
      .then(
        (res) => {
          console.log("data response manage product:::", res);

          setisloading(false);
          setisupdated(!isupdated);
          setEditDailogOpen(!EditDailogOpen);
        },

        (error) => {
          console.log("data response error:::", error);
          setisloading(false);
        }
      )
      .catch((e) => {
        console.log("data response error:::", e);
        setisloading(false);
      });
  };

  return (
    <>
      <div>
        <div className="content_padding">
          <h3 className="mb-3" onClick={() => setopendialogbox(!opendialogbox)}>
            <i class="fa fa-plus-square mr-2"></i>
            Add Brand
          </h3>
          <Expand open={opendialogbox}>
            <Card className=" mb-2 Card_shadow p-3">
              <div className="card_admissiondetails_height">
                <div className="textfiled_margin">
                  <div className="card_content_instition">
                    <div className="text_filed_heading">Add Brand</div>
                    <div className=" mt-1">
                      <input
                        type="text"
                        value={addbrand}
                        onChange={(e) => {
                          setaddbrand(e.target.value);
                        }}
                        className="form-control "
                        placeholder="Add Brand"
                        autoComplete="off"
                      />
                    </div>
                    <div className="text_filed_heading mt-3">Select Image</div>
                    <div className=" mt-1">
                      <input
                        type="file"
                        onChange={(e) => setbrandimage(e.target.files[0])}
                        className="form-control "
                        placeholder=""
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="text_filed_heading mt-3">Add Top Brand</div>
                  <label className="radio_font mr-2">
                    <input
                      className="mr-2"
                      type="radio"
                      name="optradio"
                      checked={radiovalue === "Yes"}
                      value="Yes"
                      onChange={(e) => radioHandler(e)}
                    />
                    Yes
                  </label>
                  <label className="radio_font">
                    <input
                      className="mr-2"
                      type="radio"
                      name="optradio"
                      checked={radiovalue === "No"}
                      value="No"
                      onChange={(e) => radioHandler(e)}
                    />
                    No
                  </label>

                  <div className="mt-2 pb-3 ">
                    <Button
                      variant="contained"
                      className="button_formatting mt-3"
                      onClick={addsubcategries}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </Expand>

          <TableContainer>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Add Brand</TableCell>
                  <TableCell>Brand Type</TableCell>
                  <TableCell>Delete</TableCell>
                  <TableCell>Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {brandproduct.map((item, index) => (
                  <TableRow>
                    <TableCell>
                      <img
                        class="d-block"
                        style={{ height: "40px", width: "70px" }}
                        src={getBaseUrl() + `${item.image}`}
                      />
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.featured_brand}</TableCell>

                    <TableCell>
                      <span className="">
                        <i
                          class="fa fa-trash mr-3"
                          onClick={() => deletebrand(item)}
                        ></i>
                      </span>
                    </TableCell>
                    <TableCell>
                      <span>
                        <i
                          class="fa fa-edit mr-1 pl-3"
                          onClick={() => editBeandData(item)}
                        ></i>
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <br />

          <Dialog
            aria-labelledby="form-dialog-title"
            open={EditDailogOpen}
            maxWidth="sm"
            fullWidth="fullWidth"
          >
            <DialogTitle>
              Add Brand
              <span
                className="float-right icon_color"
                onClick={() => setEditDailogOpen(!EditDailogOpen)}
              >
                <i class="fa fa-times hover_cursor" aria-hidden="true"></i>{" "}
              </span>
            </DialogTitle>
            <DialogContent>
              <div className="card_admissiondetails_height">
                <div className="textfiled_margin">
                  <div className="card_content_instition">
                    <div className="text_filed_heading">Add Brand</div>
                    <div className=" mt-1">
                      <input
                        type="text"
                        className="form-control "
                        placeholder="Sub Catagories"
                        autoComplete="off"
                        value={Editaddbrand}
                        onChange={(e) => {
                          setEditaddbrand(e.target.value);
                        }}
                      />
                    </div>
                    <div className="text_filed_heading mt-3">Select Image</div>
                    <div className=" mt-1">
                      <input
                        type="file"
                        className="form-control "
                        placeholder=""
                        autoComplete="off"
                        onChange={(e) => setEditbrandimage(e.target.files[0])}
                      />
                    </div>
                  </div>
                  <div className="text_filed_heading mt-3">Add Top Brand</div>
                  <label className="radio_font mr-2">
                    <input
                      className="mr-2"
                      type="radio"
                      name="optradio"
                      checked={Editradiovalue === "Yes"}
                      value="Yes"
                      onChange={(e) => EditradioHandler(e)}
                    />
                    Yes
                  </label>
                  <label className="radio_font">
                    <input
                      className="mr-2"
                      type="radio"
                      name="optradio"
                      checked={Editradiovalue === "No"}
                      value="No"
                      onChange={(e) => EditradioHandler(e)}
                    />
                    No
                  </label>

                  <div className="mt-2 pb-3 ">
                    <Button
                      variant="contained"
                      className="button_formatting mt-3"
                      onClick={() => editbranddata(EditId)}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <Loder loading={isloading} />
    </>
  );
}
export default HOC(Brand);
