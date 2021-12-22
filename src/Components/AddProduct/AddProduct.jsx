import React, { useState, useEffect } from "react";
import HOC from "../../Common/Hoc";
import { Button, Grid, Card } from "@material-ui/core";
import { blankValidator, showNotificationMsz } from "../utils/Validation";
import Loder from "../Loder/Loder";
import axios from "axios";
import { getBaseUrl } from "../utils";

const ProductList = (props) => {
  console.log("props data:::::", props);
  //pagetype
  let pagetype = props.location.state.PageType;

  const [description, setdescription] = useState("");
  const [title, settitle] = useState("");
  const [category, setcategory] = useState("");
  const [itemCategory, setitemCategory] = useState("");
  const [pack_size, setpack_size] = useState("");
  const [country_origin, setcountry_origin] = useState("");
  const [disclaimer, setdisclaimer] = useState("");
  const [brand_name, setbrand_name] = useState("");
  const [manufacturer_name, setmanufacturer_name] = useState("");
  const [price, setprice] = useState("");
  const [discount_price, setdiscount_price] = useState("");

  const [product_Form, setproduct_Form] = useState("");

  const [profile, setprofile] = useState(null);
  const [editId, seteditId] = useState("");
  const [isloading, setisloading] = useState(false);
  const [isUpdated, setisUpdated] = useState(false);

  //error
  const [ErrorAddProduct, setErrorAddProduct] = useState(false);
  const [Errortitle, setErrortitle] = useState(false);
  const [Errorcategory, setErrorcategory] = useState(false);
  const [ErroritemCategory, setErroritemCategory] = useState(false);
  const [Errorpack_size, setErrorpack_size] = useState(false);
  const [Errorcountry_origin, setErrorcountry_origin] = useState(false);
  const [Errordisclaimer, setErrordisclaimer] = useState(false);
  const [Errorbrand_name, setErrorbrand_name] = useState(false);
  const [Errormanufacturer_name, setErrormanufacturer_name] = useState(false);
  const [Errorprice, setErrorprice] = useState(false);
  const [Errordiscount_price, setErrordiscount_price] = useState(false);
  const [Errorprofile, setErrorprofile] = useState(false);

  /// get api categeries add
  const [subcategries, setsubcategries] = useState([]);

  useEffect(() => {
    try {
      let url = getBaseUrl() + "viewCategory";

      axios.get(url).then(
        (res) => {
          setsubcategries(res.data);
          //   console.log("data cattttt:::", res);
          // showNotificationMsz(res.data.msg, "success");
        },
        (error) => {
          showNotificationMsz(error, "danger");
        }
      );
    } catch (error) {
      showNotificationMsz(error, "danger");
    }
  }, [isUpdated]);

  useEffect(() => {
    if (pagetype === "Edit") {
      let data = props.location.state.data;
      console.log("image arr", data.productPictures);
      setdescription(data.description);
      settitle(data.title);
      setcategory(data.category);
      setitemCategory(data.itemCategory);
      setpack_size(data.pack_size);
      setcountry_origin(data.country_origin);
      setdisclaimer(data.disclaimer);
      setbrand_name(data.brand_name);
      setmanufacturer_name(data.manufacturer_name);
      setprice(data.price);
      setdiscount_price(data.discount_price);
      setproduct_Form(data.product_Form);
      setprofile(data.productPictures);
      seteditId(data._id);
    }
  }, []);

  const addProduct = () => {
    if (pagetype === "Edit") {
      let url = getBaseUrl() + `editProduct/${editId}`;

      const fd = new FormData();
      fd.append("description", description);
      fd.append("title", title);
      fd.append("category", category);
      fd.append("itemCategory", itemCategory);
      fd.append("pack_size", pack_size);
      fd.append("disclaimer", disclaimer);
      fd.append("country_origin", country_origin);
      fd.append("brand_name", brand_name);
      fd.append("manufacturer_name", manufacturer_name);
      fd.append("price", price);
      fd.append("discount_price", discount_price);
      fd.append("productForm", product_Form);

      //********* HERE IS THE CHANGE ***********

      fd.append("currentImage", profile);

      axios
        .post(url, fd)
        .then(
          (res) => {
            // console.log("data response:::", res);
            props.history.goBack();
            showNotificationMsz(res.data.msg, "success");
          },

          (error) => {
            // console.log("data response error:::", error);
            showNotificationMsz(error, "danger");
          }
        )
        .catch((e) => {
          // console.log("data response error:::", e);
          showNotificationMsz(e, "danger");
        });
    } else {
      try {
        if (!blankValidator(description)) {
          setErrorAddProduct(true);
          return;
        }
        if (!blankValidator(title)) {
          setErrortitle(true);
          return;
        }
        if (!blankValidator(category)) {
          setErrorcategory(true);
          return;
        }
        if (!blankValidator(itemCategory)) {
          setErroritemCategory(true);
          return;
        }
        if (!blankValidator(disclaimer)) {
          setErrordisclaimer(true);
          return;
        }
        if (!blankValidator(country_origin)) {
          setErrorcountry_origin(true);
          return;
        }
        if (!blankValidator(brand_name)) {
          setErrorbrand_name(true);
          return;
        }
        if (!blankValidator(manufacturer_name)) {
          setErrormanufacturer_name(true);
          return;
        }
        if (!blankValidator(profile)) {
          setErrorprofile(true);
          return;
        }

        if (!blankValidator(pack_size)) {
          setErrorpack_size(true);
          return;
        }

        let url = getBaseUrl() + "addProduct";

        const fd = new FormData();
        fd.append("description", description);
        fd.append("title", title);
        fd.append("category", category);
        fd.append("itemCategory", itemCategory);
        fd.append("pack_size", pack_size);
        fd.append("disclaimer", disclaimer);
        fd.append("country_origin", country_origin);
        fd.append("brand_name", brand_name);
        fd.append("manufacturer_name", manufacturer_name);
        fd.append("price", price);
        fd.append("discount_price", discount_price);
        fd.append("productForm", product_Form);

        //********* HERE IS THE CHANGE ***********

        fd.append("myField", profile);

        axios.post(url, fd).then(
          (res) => {
            console.log("data responseadd Product:::", res);
            props.history.goBack();
            showNotificationMsz(res.data.msg, "success");
          },

          (error) => {
            // console.log("data response error:::", error);
            showNotificationMsz(error, "danger");
          }
        );
      } catch (error) {
        showNotificationMsz(error, "danger");
        setisloading(false);
      }
    }
  };

  try {
  } catch (error) {}

  return (
    <div>
      <div className="content_padding">
        <Grid className="Component_main_grid p-2 ">
          <button
            type="button"
            class="btn btn-info mr-4"
            onClick={() => props.history.goBack()}
          >
            <i class="fa fa-arrow-left"></i>Go Back
          </button>
        </Grid>

        <div>
          <Card className=" mb-2 Card_shadow p-3">
            <div className="card_admissiondetails_height">
              <div className="textfiled_margin">
                <div className="card_content_instition">
                  <div className="text_filed_heading">Add Description</div>
                  <div className=" mt-1 mr-2">
                    <input
                      value={description}
                      onChange={(e) => {
                        setdescription(e.target.value);
                        setErrorAddProduct(false);
                      }}
                      type="text"
                      className="form-control "
                      placeholder="Details..."
                      autoComplete="off"
                    />
                    {ErrorAddProduct && (
                      <span className="text-danger">Enter Description</span>
                    )}
                  </div>

                  <Grid className="Component_main_grid">
                    <Grid item md={6} sm={12} sm={12} xs={12}>
                      <div className="text_filed_heading">Add Tittle</div>
                      <div className=" mt-1 mr-2">
                        <input
                          value={title}
                          onChange={(e) => {
                            settitle(e.target.value);
                            setErrortitle(false);
                          }}
                          type="text"
                          className="form-control "
                          placeholder="Tittle"
                          autoComplete="off"
                        />
                        {Errortitle && (
                          <span className="text-danger">Enter Title</span>
                        )}
                      </div>
                    </Grid>
                    <Grid item md={6} sm={12} sm={12} xs={12}>
                      <div className="text_filed_heading">Catagories</div>
                      <div className=" mt-1 mr-2">
                        <div class="form-group">
                          <select
                            value={category}
                            onChange={(e) => {
                              setErrorcategory(false);
                              setcategory(e.target.value);
                            }}
                            class="form-control"
                            id="exampleFormControlSelect1"
                          >
                            <option value="">Select </option>
                            <option value="Featured Brands">
                              Featured Brands
                            </option>
                            <option value="Handpicked Item">
                              Handpicked Item
                            </option>
                            <option value="Deals of the Day">
                              Deals of the Day
                            </option>
                            <option value="Top Categories">
                              Top Categories
                            </option>
                          </select>
                          {Errorcategory && (
                            <span className="text-danger">Enter category</span>
                          )}
                        </div>
                      </div>
                    </Grid>
                  </Grid>

                  <Grid className="Component_main_grid">
                    <Grid item md={6} sm={12} sm={12} xs={12}>
                      <div className="text_filed_heading">Sub Catagories</div>
                      <div className=" mt-1 mr-2">
                        <div class="form-group">
                          <select
                            value={itemCategory}
                            onChange={(e) => {
                              setitemCategory(e.target.value);
                            }}
                            class="form-control"
                            id="exampleFormControlSelect1"
                          >
                            <option>Personal Care</option>
                            {subcategries.map((item, index) => (
                              <option>{item.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </Grid>
                    <Grid item md={6} sm={12} sm={12} xs={12}>
                      <div className="text_filed_heading">Pack Size</div>
                      <div className=" mt-1 mr-2">
                        <div className=" mt-1 mr-2">
                          <input
                            value={pack_size}
                            onChange={(e) => {
                              setErrorpack_size(false);
                              setpack_size(e.target.value);
                            }}
                            type="text"
                            className="form-control "
                            placeholder="weight"
                            autoComplete="off"
                          />
                          {Errorpack_size && (
                            <span className="text-danger">Enter Pack Size</span>
                          )}
                        </div>
                      </div>
                    </Grid>
                  </Grid>

                  <Grid className="Component_main_grid">
                    <Grid item md={6} sm={12} sm={12} xs={12}>
                      <div className="text_filed_heading">
                        Country of origin
                      </div>
                      <div className=" mt-1 mr-2">
                        <div class="form-group">
                          <select
                            value={country_origin}
                            onChange={(e) => {
                              setcountry_origin(e.target.value);
                            }}
                            class="form-control"
                            id="exampleFormControlSelect1"
                          >
                            <option>Country </option>
                            <option>India</option>
                            <option>China</option>
                          </select>
                        </div>
                      </div>
                    </Grid>
                    <Grid item md={6} sm={12} sm={12} xs={12}>
                      <div className="text_filed_heading">Disclaimer</div>
                      <div className="mr-2 mt-1">
                        <input
                          value={disclaimer}
                          onChange={(e) => {
                            setdisclaimer(e.target.value);
                          }}
                          type="text"
                          className="form-control "
                          placeholder="Disclaimer"
                          autoComplete="off"
                        />
                      </div>
                    </Grid>
                  </Grid>

                  <Grid className="Component_main_grid">
                    <Grid item md={6} sm={12} sm={12} xs={12}>
                      <div className="text_filed_heading">Brand Name</div>
                      <div className="mr-2 mt-1">
                        <input
                          value={brand_name}
                          onChange={(e) => {
                            setbrand_name(e.target.value);
                            setErrorbrand_name(false);
                          }}
                          type="text"
                          className="form-control "
                          placeholder="Add Brand"
                          autoComplete="off"
                        />
                        {Errorbrand_name && (
                          <span className="text-danger">Enter Brand Name</span>
                        )}
                      </div>
                    </Grid>
                    <Grid item md={6} sm={12} sm={12} xs={12}>
                      <div className="text_filed_heading">
                        Manufacturer Name
                      </div>
                      <div className="">
                        <div className=" mt-1">
                          <input
                            value={manufacturer_name}
                            onChange={(e) => {
                              setmanufacturer_name(e.target.value);
                              setErrormanufacturer_name(false);
                            }}
                            type="text"
                            className="form-control "
                            placeholder="Manufactures"
                            autoComplete="off"
                          />
                          {Errormanufacturer_name && (
                            <span className="text-danger">
                              Enter Manufacturer Name
                            </span>
                          )}
                        </div>
                      </div>
                    </Grid>
                  </Grid>

                  <Grid className="Component_main_grid">
                    <Grid item md={6} sm={12} sm={12} xs={12}>
                      <div className="text_filed_heading">Add Price</div>
                      <div className="mr-2 mt-1">
                        <input
                          value={price}
                          onChange={(e) => {
                            setprice(e.target.value);
                          }}
                          type="text"
                          className="form-control "
                          placeholder="Price"
                          autoComplete="off"
                        />
                      </div>
                    </Grid>
                    <Grid md={6} sm={12} xs={12}>
                      <div className="">
                        <div className="text_filed_heading ">Product Form</div>

                        <div className=" mt-1 mr-2">
                          <div class="form-group">
                            <select
                              value={product_Form}
                              onChange={(e) => {
                                setproduct_Form(e.target.value);
                              }}
                              class="form-control"
                              id="exampleFormControlSelect1"
                            >
                              <option>Product </option>
                              <option>Capsule</option>
                              <option>Powder</option>
                              <option>Tablet</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </Grid>
                  </Grid>

                  <Grid className="Component_main_grid">
                    <Grid item md={6} sm={12} xs={12}>
                      <div className="text_filed_heading mt-3 mb-2">
                        Add Product Image
                      </div>
                      <div className="mr-2 mt-1">
                        <input
                          type="file"
                          class="form-control"
                          onChange={(e) => {
                            setprofile(e.target.files[0]);
                            setErrorprofile(false);
                          }}
                        />
                        {Errorprofile && (
                          <span className="text-danger">Select Image</span>
                        )}
                      </div>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                      <div className="mt-3">
                        <div className="text_filed_heading ">
                          Discount Price
                        </div>
                        <div className=" mt-1">
                          <input
                            value={discount_price}
                            onChange={(e) => {
                              setdiscount_price(e.target.value);
                            }}
                            type="number"
                            className="form-control "
                            placeholder="Price"
                            autoComplete="off"
                          />
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </div>
                <div className="mt-2 pb-3 ">
                  <button
                    type="button"
                    class="btn btn-info mr-4"
                    onClick={addProduct}
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <Loder loading={isloading} />
    </div>
  );
};

export default HOC(ProductList);
