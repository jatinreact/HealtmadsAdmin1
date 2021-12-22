import React, { useState, useEffect } from "react";
import HOC from "../../Common/Hoc";
import axios from "axios";
import Loder from "../Loder/Loder";
import { getBaseUrl } from "../utils";

import {
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";

const AddBanner = () => {
  const [banner, setbanner] = useState(null);
  const [gallary, setgallary] = useState([]);
  const [isupdated, setisupdated] = useState(false);
  const [isloading, setisloading] = useState(false);

  ///edit banner

  const [EditDailogOpen, setEditDailogOpen] = useState("");

  const [image, setimage] = useState("");
  const [imageId, setimageId] = useState("");

  const Handlebanner = (item) => {
    // console.log("editbanner:::::", item);
    setimage(item.bannerImage);
    setimageId(item._id);
    setEditDailogOpen(!EditDailogOpen);
  };

  //edit banner api
  const editfeatures = (Id) => {
    let EditId = Id;
    setisloading(true);
    let url = getBaseUrl() + `editBanner/${EditId}`;

    const fd = new FormData();

    //********* HERE IS THE CHANGE ***********

    fd.append("myField", image);

    axios
      .post(url, fd)
      .then(
        (res) => {
          setisupdated(!isupdated);
          setisloading(false);

          setEditDailogOpen(!EditDailogOpen);
        },

        (error) => {
          setisloading(false);
        }
      )
      .catch((e) => {
        setisloading(false);
      });
  };

  /// delete banner

  const deletebanner = (item) => {
    let id = item._id;
    setisloading(true);
    let url = getBaseUrl() + `deleteBanner/${id}`;
    axios
      .get(url)
      .then(
        (res) => {
          setisupdated(!isupdated);
          setisloading(false);
        },

        (error) => {
          setisloading(false);
        }
      )
      .catch((e) => {
        setisloading(false);
      });
  };

  ///get banner

  useEffect(() => {
    try {
      let url = getBaseUrl() + "getBanner ";
      axios.get(url).then(
        (res) => {
          setgallary(res.data.data);
          console.log("getbanner", res);
        },
        (error) => {}
      );
    } catch (error) {}
  }, [isupdated]);

  ////baner add first
  const addbanner = () => {
    if (banner === null || banner === "") {
      alert("Choose the image");
      return;
    }
    setisloading(true);
    let url = getBaseUrl() + "addBanner";

    const fd = new FormData();

    //********* HERE IS THE CHANGE ***********

    fd.append("myField", banner);

    axios
      .post(url, fd)
      .then(
        (res) => {
          alert("banner Successfully added");
          setisupdated(!isupdated);
          setbanner(null);
          setisloading(false);
          console.log("addbanner", res);
        },

        (error) => {
          setisloading(false);
        }
      )
      .catch((e) => {
        setisloading(false);
      });
  };

  return (
    <>
      <div className="content_padding">
        <div class="mb-3"></div>
        <div class="mb-3">
          <label for="formGroupExampleInput2" class="form-label">
            Add Banner
          </label>
          <input
            onChange={(e) => setbanner(e.target.files[0])}
            type="file"
            class="form-control-file"
            id="exampleFormControlFile1"
          />
        </div>
        <button
          type="button"
          class="btn btn-info mb-3 pl-3 pr-3"
          onClick={addbanner}
        >
          Create
        </button>

        <div class="card ">
          {gallary
            ? gallary.map((item, index) => (
                <div class="">
                  <img
                    class="d-block w-100 h-400"
                    src={getBaseUrl() + `public/images/${item.bannerImage}`}
                    alt="First slide"
                  />
                  <div align="left" className="mt-3 mb-2">
                    <span>
                      <button
                        className="btn btn-info mr-3"
                        onClick={() => Handlebanner(item)}
                      >
                        <i class="fa fa-edit"></i>Edit
                      </button>
                    </span>
                    <span>
                      <button
                        className="btn btn-info"
                        onClick={() => deletebanner(item)}
                      >
                        <i class="fa fa-trash"></i>Delete
                      </button>
                    </span>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>

      <div className="">
        <Dialog
          open={EditDailogOpen}
          aria-labelledby="form-dialog-title"
          maxWidth="sm"
          fullWidth="fullWidth"
        >
          <DialogTitle>
            Add Banner
            <span
              className="float-right icon_color"
              onClick={() => setEditDailogOpen(!EditDailogOpen)}
            >
              <i class="fa fa-times hover_cursor" aria-hidden="true"></i>{" "}
            </span>
          </DialogTitle>
          <DialogContent>
            <div class="mb-3">
              <label for="formGroupExampleInput2" class="form-label"></label>
              <input
                onChange={(e) => setimage(e.target.files[0])}
                type="file"
                class="form-control-file"
                id="exampleFormControlFile1"
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              className="button_formatting"
              onClick={() => setEditDailogOpen(!EditDailogOpen)}
            >
              Cancel
            </Button>
            <Button
              className="button_formatting"
              onClick={() => editfeatures(imageId)}
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <Loder loading={isloading} />
    </>
  );
};

export default HOC(AddBanner);
