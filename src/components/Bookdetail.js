import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { useParams } from "react-router";
import { getbook } from "../redux/actions/book";
import { uploadComment, getComment } from "../redux/actions/comment";
import { createOrder } from "../redux/actions/order";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "../css/bookdetail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactStars from "react-rating-stars-component";
import {
  faCoins,
  faLayerGroup,
  faHeart,
  faUserSecret,
  faCalendar,
  faCartShopping,
  faBagShopping,
  faLink,
  faSmile,
  faAt,
  faPaperPlane,
  faCreditCard,
  faMoneyBill,
  faXmark,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { faPaypal } from "@fortawesome/free-brands-svg-icons";
import { faHeart as heart } from "@fortawesome/free-regular-svg-icons";
import $, { event } from "jquery";
import $$ from "jquery";


const BookDetail = () => {
  const bookdata = useSelector((state) => state.book.data);
  const commentdata = useSelector((state) => state.comment.data);
  const username = localStorage.getItem("username");
  const location = useLocation();
  const token = localStorage.getItem("token");
  const [book, setBook] = useState(bookdata);
  const [comment, setComment] = useState(commentdata);
  const [isUpload, setUpload] = useState(false);
  const [isload, setisload] = useState(false);
  const params = useParams();
  const id = params.id;
  const dispatch = useDispatch();
  const [rating_value, setRating] = useState(0);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dispatch(getbook(id));
    dispatch(getComment(id));
  }, [location.pathname]);
  useEffect(() => {
    setBook(bookdata);
  }, [bookdata]);
  useEffect(() => {
    setComment(commentdata);
  }, [commentdata]);
  function test() {
    setisload(false);
    const reg = /^\+\d{2}\d{8,10}$/;
    let method = $("#method input[type='radio']:checked").val();
    let shipng = $("#shiping input[type='radio']:checked").val();
    let zipcode = $("#zip-code").val();
    let name = $("#Name").val();
    let address = $("#Adress").val();
    let phone = $("#Phone").val();
    let Email = $("#email").val();
    let country = $("#country").val();
    let city = $("#billing-city").val();
    let quantity =$("#quantity").val()
    const data = {
      Phone: phone,
      Name: name,
      Address: address,
      Email: Email,
      Payment: method,
      Country: country,
      City: city,
      Zipcode: zipcode,
      Shipping: shipng,
      quantity : quantity
    };
    if (
      zipcode === "" ||
      name === "" ||
      address === "" ||
      !reg.test(phone)||
      Email === "" ||
      country === "" ||
      city === "" ||
      quantity <=0
    ) {
      return;
    } else {
      console.log(data);
      setTimeout(() => {
        setisload(true);
      }, 5000);
      window.$("#exampleModal").modal("hide");
      window.$("#success-Payment").modal("show");
      dispatch(createOrder(data,username,id))
    }
  }
  const rating = {
    size: 20,
    count: 5,
    value: 0,
    color: "black",
    activeColor: "rgba(25,134,84,1)",
    emptyIcon: <FontAwesomeIcon icon={heart} style={{ color: "#dee2e6" }} />,
    filledIcon: <FontAwesomeIcon icon={faHeart} style={{ opacity: "0.8" }} />,
    onChange: (newValue) => {
      setRating(newValue);
      console.log(newValue);
    },
  };
  const SendComment = async () => {
    setUpload(true);
    const description = $("#comment").val();
    const star = rating_value;
    const User = username;
    const data = {
      User: User,
      Star: star,
      Description: description,
      Book: id,
    };
   await dispatch(uploadComment(data, id));
   setTimeout(() => {
     setUpload(false);
     dispatch(getComment(id));
    }, 2000);
  };

  return !token ? (
    <Redirect to="/login"></Redirect>
  ) : (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0">Book Desctiption</h4>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="card carda">
                <div className="card-body card-bodya">
                  <div className="row gx-lg-5">
                    <div className="col-xl-4 col-md-8 mx-auto">
                      <div
                        className="img-field "
                        style={{ width: "408px", marginRight: "24px" }}
                      >
                        <img
                          src={book.image}
                          className="img-fluid d-block"
                          alt="not found"
                        ></img>
                      </div>
                      <div className="row">
                        <div className="col-lg-10 col-sm-8">
                          <div className="row text-center mt-4 pt-1">
                            <div className="col-sm-6">
                              <div className="d-grid">
                                <button
                                  type="button"
                                  className="btn btn-primary waves-effect waves-light mt-2 me-1"
                                  data-bs-toggle="modal"
                                  data-bs-target="#exampleModal"
                                  onClick={() => {
                                    // $("#addtocartbtn").removeAttr(
                                    //   "data-bs-toggle"
                                    // )
                                    // $("#addtocartbtn").removeAttr(
                                    //   "data-bs-target"
                                    // )
                                  }}
                                >
                                  <FontAwesomeIcon icon={faCartShopping} /> Add
                                  to cart
                                </button>
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="d-grid">
                                <button
                                  type="button"
                                  className="btn btn-light waves-effect  mt-2 waves-light"
                                >
                                  <FontAwesomeIcon icon={faBagShopping} />
                                  Buy now
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-8">
                      <div className="mt-xl-0 mt-5">
                        <div className="d-flex ">
                          <div className="flex-grow-1 ">
                            <h4>{book.title}</h4>
                            <div className="hstack gap-3 flex-wrap">
                              <div>
                                <a href="#" className="text-primary d-block">
                                  {book.author}
                                </a>
                              </div>
                              <div className="vr"></div>
                              <div className="text-muted">
                                Category :{" "}
                                <span className="text-body fw-medium">
                                  {book.category}
                                </span>
                              </div>
                              <div className="vr"></div>
                              <div className="text-muted">
                                Upload :
                                <span className="text-body fw-medium">
                                  {book.createdAt}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row mt-4">
                          <h5 className="fs-14 des">Description</h5>
                          <p className="des" style={{ textAlign: "justify" }}>
                            {book.description}
                          </p>
                        </div>
                        <div className="row mt-4">
                          <div className="col-lg-3 col-sm-6">
                            <div className="p-2 border border-dashed rounded">
                              <div className="d-flex align-items-center">
                                <div className="avatar-sm me-2">
                                  <div className="avatar-title rounded bg-transparent text-success fs-24">
                                    <FontAwesomeIcon icon={faCoins} />
                                  </div>
                                </div>
                                <div className="flex-grow-1">
                                  <div className="text-muted mb-1">
                                    Price :
                                    <h6
                                      className="mb-0"
                                      style={{ display: "inline-block" }}
                                    >
                                      {book.price}
                                    </h6>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-3 col-sm-6">
                            <div className="p-2 border border-dashed rounded">
                              <div className="d-flex align-items-center">
                                <div className="avatar-sm me-2">
                                  <div className="avatar-title rounded bg-transparent text-success fs-24">
                                    <FontAwesomeIcon icon={faLayerGroup} />
                                  </div>
                                </div>
                                <div className="flex-grow-1">
                                  <div className="text-muted mb-1">
                                    Page_number :
                                    <h6
                                      className="mb-0"
                                      style={{ display: "inline-block" }}
                                    >
                                      {book.page_number}
                                    </h6>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="product-content mt-5">
                          <h5 className="fs-14 mb-3 des">Product Detail :</h5>
                          <nav>
                            <ul
                              className="nav nav-tabs nav-tabs-custom nav-success"
                              id="nav-tab"
                              role="tablist"
                            >
                              <li className="nav-item" role="presentation">
                                <a
                                  className="nav-link active"
                                  id="nav-speci-tab"
                                  data-bs-toggle="tab"
                                  href="#nav-speci"
                                  role="tab"
                                  aria-controls="nav-speci"
                                  aria-selected="true"
                                >
                                  Specification
                                </a>
                              </li>
                              <li className="nav-item" role="presentation">
                                <a
                                  className="nav-link"
                                  id="nav-detail-tab"
                                  data-bs-toggle="tab"
                                  href="#nav-detail"
                                  role="tab"
                                  aria-controls="nav-detail"
                                  aria-selected="false"
                                  tabIndex="-1"
                                >
                                  Details
                                </a>
                              </li>
                            </ul>
                          </nav>
                          <div
                            className="tab-content border border-top-0 p-4"
                            id="nav-tabContent"
                          >
                            <div
                              className="tab-pane fade active show"
                              id="nav-speci"
                              role="tabpanel"
                              aria-labelledby="nav-speci-tab"
                            >
                              <div className="table-responsive">
                                <table className="table mb-0">
                                  <tbody>
                                    <tr>
                                      <th
                                        scope="row"
                                        style={{ width: "200px" }}
                                      >
                                        Thể loại
                                      </th>
                                      <td>{book.category}</td>
                                    </tr>
                                    <tr>
                                      <th scope="row">Xuất xứ</th>
                                      <td>Việt Nam</td>
                                    </tr>
                                    <tr>
                                      <th scope="row">Tác giả</th>
                                      <td>{book.author}</td>
                                    </tr>
                                    <tr>
                                      <th scope="row">Ngày xuất bản</th>
                                      <td>{book.release}</td>
                                    </tr>
                                    <tr>
                                      <th scope="row">Cân nặng</th>
                                      <td>140 Gram</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            <div
                              className="tab-pane fade"
                              id="nav-detail"
                              role="tabpanel"
                              aria-labelledby="nav-detail-tab"
                            >
                              <div>
                                <h5 className="font-size-16 mb-3">
                                  Tác giả siêu cấp VIP PRO
                                </h5>
                                <p style={{ display: "flex" }}>
                                  blah blah blah ....
                                </p>
                                <div style={{ display: "flex" }}>
                                  <p className="mb-2">
                                    <i className="mdi mdi-circle-medium me-1 text-muted align-middle"></i>{" "}
                                    Sang xịn mịn
                                  </p>
                                  <p className="mb-2">
                                    <i className="mdi mdi-circle-medium me-1 text-muted align-middle"></i>{" "}
                                    khá hay
                                  </p>
                                  <p className="mb-2">
                                    <i className="mdi mdi-circle-medium me-1 text-muted align-middle"></i>{" "}
                                    100% hàng thật
                                  </p>
                                  <p className="mb-0">
                                    <i className="mdi mdi-circle-medium me-1 text-muted align-middle"></i>{" "}
                                    gấp máy bay tốt
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-5">
                          <div>
                            <h5 className="fs-14 mb-3" style={{ display: "flex" }}>
                              Ratings & Reviews
                            </h5>
                          </div>
                          <div className="row gy-4 gx-0">
                            <div className="col-lg-4">
                              <div>
                                <div className="d-flex align-items-center">
                                  <div className="text-muted mb-3">
                                    <div className="fs-16 align-middle text-warning">
                                      <div className="text-muted mb-3">
                                        <span className="badge bg-success font-size-14 me-1">
                                          <i className="mdi mdi-star"></i> 4.2
                                        </span>
                                        234 Reviews
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row gy-4 gx-0">
                            <div className="border py-4 rounded">
                              {isUpload && (
                                <div id="ProgressBar">
                                  <div id="Progress"></div>
                                </div>
                              )}
                              <div
                                className="px-4"
                                data-simplebar="init"
                                style={{ maxHeight: "360px" }}
                              >
                                <div
                                  className="simplebar-wrapper"
                                  style={{ margin: "0 -24px" }}
                                >
                                  <div className="simplebar-height-auto-observer-wrapper">
                                    <div className="simplebar-height-auto-observer"></div>
                                  </div>
                                  <div className="simplebar-mask ">
                                    <div
                                      className="simplebar-offset"
                                      style={{
                                        right: "-16.8px",
                                        bottom: "0px",
                                      }}
                                    >
                                      <div
                                        className="simplebar-content-wrapper "
                                        style={{
                                          height: "auto",
                                          overflow: "hidden scroll",
                                        }}
                                      >
                                        <div
                                          className="simplebar-content"
                                          style={{ padding: "0px 24px" }}
                                        >
                                          {comment?.map((item, idex) => (
                                            <div
                                              className="border-bottom pb-3"
                                              style={{ textAlign: "justify" }}
                                            >
                                              <p className="float-sm-end text-muted font-size-13">
                                                {item.updatedAt}
                                                <FontAwesomeIcon
                                                  icon={faCalendar}
                                                  style={{ marginLeft: "5px" }}
                                                />
                                              </p>
                                              <div className="badge bg-success mb-2">
                                                <i className="mdi mdi-star"></i>{" "}
                                                {item.Star}
                                              </div>
                                              <p className="text-muted mb-4">
                                                {item.Description}
                                              </p>
                                              <div className="d-flex align-items-start">
                                                <div className="flex-grow-1">
                                                  <div className="d-flex">
                                                    <FontAwesomeIcon
                                                      icon={faUserSecret}
                                                    />
                                                    <div className="flex-1 ms-2 ps-1">
                                                      <h5 className="font-size-16 mb-0">
                                                        {item.User.username}
                                                      </h5>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="simplebar-placeholder"
                                    style={{ width: "auto", height: "584px" }}
                                  ></div>
                                </div>
                                <div
                                  className="simplebar-track simplebar-horizontal"
                                  style={{ visibility: "hidden" }}
                                >
                                  <div
                                    className="simplebar-scrollbar"
                                    style={{
                                      transform: "translate3d(0px, 0px, 0px)",
                                      display: "none",
                                    }}
                                  ></div>
                                </div>
                                <div
                                  className="simplebar-track simplebar-vertical"
                                  style={{ visibility: "visible" }}
                                >
                                  <div
                                    className="simplebar-scrollbar"
                                    style={{
                                      height: "221px",
                                      transform:
                                        " translate3d(0px, 139px, 0px)",
                                      display: "block",
                                    }}
                                  ></div>
                                </div>
                              </div>

                              <div className="px-4 mt-2">
                                <div className="border rounded mt-4">
                                  <form action="#">
                                    <div
                                      className="px-2 py-1 bg-light"
                                      style={{ textAlign: "start" }}
                                    >
                                      <div className="btn-group" role="group">
                                        <button
                                          type="button"
                                          className="btn btn-sm btn-link text-dark text-decoration-none"
                                        >
                                          <FontAwesomeIcon icon={faLink} />
                                        </button>
                                        <button
                                          type="button"
                                          className="btn btn-sm btn-link text-dark text-decoration-none"
                                        >
                                          <FontAwesomeIcon icon={faSmile} />
                                        </button>
                                        <button
                                          type="button"
                                          className="btn btn-sm btn-link text-dark text-decoration-none"
                                        >
                                          <FontAwesomeIcon icon={faAt} />
                                        </button>
                                      </div>
                                    </div>
                                    <textarea
                                      rows="3"
                                      className="form-control border-0 resize-none"
                                      placeholder="Your Message..."
                                      id="comment"
                                    ></textarea>
                                  </form>
                                </div>
                                <div className="text-end mt-3 ">
                                  <div
                                    className="mb-3 row"
                                    style={{
                                      textAlign: "end",
                                      alignItems: "center",
                                      justifyContent: "end",
                                    }}
                                  >
                                    <label className="col-md-2 col-form-label">
                                      Star
                                    </label>
                                    <div className="col-md-2">
                                      <ReactStars {...rating} />
                                    </div>
                                    <button
                                      type="button"
                                      className="btn btn-success w-sm text-truncate ms-2 col-md-1"
                                      style={{
                                        borderRadius: "10px",
                                        opacity: 0.9,
                                      }}
                                      onClick={() => SendComment()}
                                    >
                                      Send
                                      <FontAwesomeIcon
                                        icon={faPaperPlane}
                                        style={{ marginLeft: "5px" }}
                                      />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* -------------------------------------------Form Order---------------------------------------------------------- */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="myExtraLargeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl modal-dialog-centered">
          <form className="modal-content  ">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Add to Cart
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body " noValidate>
              <div className="row" style={{ textAlign: "-webkit-auto" }}>
                <div className="col-md-6 needs-validation was-validated">
                  <div className="mb-3">
                    <label className="form-label" htmlFor="AddOrder-Name">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Name"
                      id="Name"
                      required
                    />
                    <div className="invalid-feedback">Enter this field!</div>
                  </div>
                </div>
                <div className="col-md-6 needs-validation was-validated">
                  <div className="mb-3">
                    <label className="form-label" htmlFor="AddOrder-Adress">
                      Adress
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Adress"
                      id="Adress"
                      required
                    />
                    <div className="invalid-feedback">Enter this field!</div>
                  </div>
                </div>
                <div className="col-md-6 needs-validation was-validated">
                  <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Enter Phone Number"
                      id="Phone"
                      pattern="^\+\d{2}\d{8,10}$"
                      required
                    />
                    <div className="invalid-feedback">
                      Enter valid phone number!
                    </div>
                  </div>
                </div>
                <div className="col-md-6 needs-validation was-validated">
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter email contact"
                      id="email"
                      required
                    />
                    <div className="invalid-feedback">Enter valid Email</div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="mb-3">
                    <label
                      className="form-label"
                      style={{ marginBottom: "1.5rem" }}
                    >
                      Payment method
                    </label>
                    <div className="row" id="method">
                      <div className="col-lg-3 col-sm-6">
                        <div data-bs-toggle="collapse">
                          <label className="card-radio-label">
                            <input
                              type="radio"
                              name="pay-method"
                              id="pay-methodoption1"
                              className="card-radio-input form-check-input"
                              defaultChecked
                              value={"Credit/Debit Card"}
                            />
                            <span className="card-radio py-3 text-center text-truncate">
                              <FontAwesomeIcon
                                icon={faCreditCard}
                                style={{ marginRight: "5px" }}
                              />
                              Credit / Debit Card
                            </span>
                          </label>
                        </div>
                      </div>

                      <div className="col-lg-3 col-sm-6">
                        <div>
                          <label className="card-radio-label">
                            <input
                              type="radio"
                              name="pay-method"
                              id="pay-methodoption2"
                              className="card-radio-input form-check-input"
                              value={"Paypal"}
                            />
                            <span
                              className="card-radio py-3 text-center text-truncate"
                              style={{ width: "134.36px" }}
                            >
                              <FontAwesomeIcon
                                icon={faPaypal}
                                style={{ marginRight: "5px" }}
                              />
                              Paypal
                            </span>
                          </label>
                        </div>
                      </div>

                      <div className="col-lg-3 col-sm-6">
                        <div>
                          <label className="card-radio-label">
                            <input
                              type="radio"
                              name="pay-method"
                              id="pay-methodoption3"
                              className="card-radio-input form-check-input"
                              value={"Cash"}
                            />
                            <span className="card-radio py-3 text-center text-truncate">
                              <FontAwesomeIcon
                                icon={faMoneyBill}
                                style={{ marginRight: "5px" }}
                              />
                              <span>Cash on Delivery</span>
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-3">
                    <div className="mb-4 mb-lg-0">
                      <label className="form-label">Country</label>
                      <select
                        className="form-control form-select is-invalid"
                        title="Country"
                        id="country"
                        required
                        onChange={() => {
                          $("#country").removeClass("is-invalid");
                          $("#country").addClass("is-valid");
                        }}
                      >
                        <option selected disabled value>
                          Select Country
                        </option>
                        <option value="VN">Viet Nam</option>
                        <option value="CC">Ching Chong</option>
                        <option value="HX">Han Xeng</option>
                      </select>
                      <div
                        id="validationServer04Feedback"
                        className="invalid-feedback"
                      >
                        Please select a valid state.
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-3 needs-validation was-validated">
                    <div className="mb-4 mb-lg-0">
                      <label className="form-label" htmlFor="billing-city">
                        City
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="billing-city"
                        placeholder="Enter City"
                        required
                      />
                      <div className="invalid-feedback">Enter this field!</div>
                    </div>
                  </div>

                  <div className="col-lg-3 needs-validation was-validated">
                    <div className="mb-0">
                      <label className="form-label" htmlFor="zip-code">
                        Zip / Postal code
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="zip-code"
                        placeholder="Enter Postal code"
                        required
                      />
                      <div className="invalid-feedback">Enter this field!</div>
                    </div>
                  </div>
                  <div className="col-lg-3 needs-validation was-validated">
                    <div className="mb-0">
                      <label className="form-label" htmlFor="zip-code">
                        Quantity
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="quantity"
                        placeholder="Enter Quantity"
                        required
                        min={1}
                      />
                      <div className="invalid-feedback">Enter valid number</div>
                    </div>
                  </div>
                </div>
                <div className="mt-4" id="shiping">
                  <h5 className="fs-14 mb-3">Shipping Method</h5>
                  <div className="row g-4">
                    <div className="col-lg-6">
                      <div className="form-check card-radio">
                        <input
                          id="shippingMethod01"
                          name="shippingMethod"
                          type="radio"
                          className="form-check-input"
                          value={"Free"}
                          defaultChecked
                        />
                        <label className="form-check-label" htmlFor="shippingMethod01">
                          <span className="fs-20 float-end mt-2 text-wrap d-block fw-semibold">
                            Free
                          </span>
                          <span className="fs-14 mb-1 text-wrap d-block">
                            Free Delivery
                          </span>
                          <span className="text-muted fw-normal text-wrap d-block">
                            Expected Delivery 3 to 5 Days
                          </span>
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-check card-radio">
                        <input
                          id="shippingMethod02"
                          name="shippingMethod"
                          type="radio"
                          className="form-check-input"
                          value={"Express"}
                        />
                        <label className="form-check-label" htmlFor="shippingMethod02">
                          <span className="fs-20 float-end mt-2 text-wrap d-block fw-semibold">
                            <del className="text-muted me-2">$20</del>
                            Free
                          </span>
                          <span className="fs-14 mb-1 text-wrap d-block">
                            Express Delivery
                          </span>
                          <span className="text-muted fw-normal text-wrap d-block">
                            Delivery within 24hrs.
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="submit"
                className="btn btn-danger me-1"
                data-bs-dismiss="modal"
                style={{ opacity: "0.9" }}
              >
                <FontAwesomeIcon
                  icon={faXmark}
                  style={{
                    marginRight: "0.25rem",
                    width: "14px",
                    height: "14px",
                  }}
                />
                Close
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={() => test()}
                id="addtocartbtn"
              >
                <FontAwesomeIcon
                  icon={faCheck}
                  style={{
                    marginRight: "0.25rem",
                    width: "14px",
                    height: "14px",
                  }}
                />
                Confirm
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* ______________________________Succesmodal___________________________________________ */}
      <div
        id="success-Payment"
        className="modal fade"
        tabIndex="-1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        style={{ display: "none" }}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body text-center p-5">
              {isload && (
                <div className="text-end">
                  <button
                    type="button"
                    className="btn-close text-end"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
              )}
              <div className="mt-2">
                {isload && (
                  <lord-icon
                    src="https://cdn.lordicon.com/tqywkdcz.json"
                    trigger="hover"
                    style={{ width: "150px", height: "150px" }}
                  ></lord-icon>
                )}
                {!isload && <div className="lds-hourglass"></div>}
                {isload && <h4 className="mb-3 mt-4">Add to Cart Successfull !</h4>}
                {isload && (
                  <p className="text-muted fs-15 mb-4">
                    Go to your cart to confirm and starting order
                  </p>
                )}
              </div>
            </div>
            <div className="modal-footer bg-light p-3 justify-content-center">
              <p className="mb-0 text-muted">Book @2022</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BookDetail;
