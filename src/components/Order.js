import React, { useState, useEffect } from "react";
import { Redirect, useLocation } from "react-router";
import "../css/order.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen, faEye ,faTruckFast} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrder, DeleteOrder } from "../redux/actions/order";
import $ from "jquery";
const Order = () => {
  const orderdata = useSelector((state) => state.order.data);
  const [order, setOrder] = useState(orderdata);
  const dispatch = useDispatch();
  const location = useLocation();
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");
  useEffect(() => {
    dispatch(getOrder(username));
  }, [location.pathname]);
  useEffect(() => {
    setOrder(orderdata);
  }, [orderdata]);
  const deleteOrder = (OrderId) => {
    $(".delete-record").attr({
      id: OrderId,
    });
  };
  const confirmdelete = async () => {
    var orderId = document.querySelector(".delete-record").id;
    console.log(orderId);
    await dispatch(DeleteOrder(orderId));
    await dispatch(getOrder(username));
    window.$("#deleteOrder").modal("hide");
  };
  const show = (index)=>{
    document.getElementById("orderId").value=order[index].Name
    document.getElementById("orderAddress").value=order[index].Address
    document.getElementById("orderEmail").value=order[index].Email
    document.getElementById("orderPhone").value=order[index].Phone
    document.getElementById("payment").value=order[index].Payment
    document.getElementById("orderTime").value=order[index].updatedAt    
    document.getElementById("country").value=order[index].Country
    document.getElementById("City").value=order[index].City
    document.getElementById("zipcode").value=order[index].Zipcode
    document.getElementById("Shipping").value=`${order[index].Shipping}`
  }
  return !token ? (
    <Redirect to="/login"></Redirect>
  ) : (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0">Cart</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to={"/"}>
                        <a>Home</a>
                      </Link>
                    </li>
                    <li className="active breadcrumb-item" aria-current="page">
                      <Link to={"/Order"}>
                        <a href="/Order">Cart</a>
                      </Link>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          {order?.map((item, index) => (
            <div className="mb-3 row">
              <div className="col-xl-11">
                <div
                  className="border shadow-none card"
                  style={{ minWidth: "100%" }}
                >
                  <div className="card-body">
                    <div className="d-flex align-items-start border-bottom pb-3">
                      <div className="flex-shrink-0 me-4">
                        <img
                          src={item.Book.image}
                          alt="not found"
                          className="avatar-lg"
                          style={{
                            minWidth: "6rem",
                            maxWidth: "6rem",
                            objectFit: "cover",
                            maxHeight: "140px",
                          }}
                        />
                      </div>
                      <div
                        className="flex-grow-1 align-self-center overflow-hidden"
                        style={{ display: "flex", textAlign: "justify" }}
                      >
                        <div>
                          <h5 className="text-truncate font-size-16">
                            <Link to={`/Book/${item.Book._id}`}>
                            <a className="text-dark" href="#">
                              Tên sách :
                              <span className="fw-medium">{item.Book.title}</span>
                            </a>
                            </Link>
                          </h5>
                          <p className="mb-1">
                            Tác giả :{" "}
                            <span className="fw-medium">{item.Book.author}</span>
                          </p>
                          <p>
                            Ngày phát hành :{" "}
                            <span className="fw-medium">{item.Book.release}</span>
                          </p>
                        </div>
                      </div>
                      <div className="ms-2">
                        <ul className="list-inline mb-0 font-size-16">
                          <li className="list-inline-item">
                            <a className="text-muted px-2" href="">
                              <FontAwesomeIcon
                                icon={faPen}
                                style={{ color: "rgba(52,195,143,1)" }}
                              />
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a
                              className="text-muted px-2"
                              href="#showModal"
                              data-bs-toggle="modal"
                              onClick={()=>show(index)}
                            >
                              <FontAwesomeIcon
                                icon={faEye}
                                style={{ color: "rgba(64,82,137,1)" }}
                                id={item._id}
                              />
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a
                              className="text-muted px-2 "
                              data-bs-toggle="modal"
                              href="#deleteOrder"
                              id={item._id}
                              onClick={() => deleteOrder(item._id)}
                            >
                              <FontAwesomeIcon
                                icon={faTrash}
                                style={{ color: "rgba(240,101,72,1)" }}
                              />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div>
                      <div className="row">
                        <div className="col-md-4">
                          <div className="mt-3">
                            <p className="text-muted mb-2">Price</p>
                            <h5 className="font-size-16">{item.Book.price}</h5>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="mt-3" style={{ display: "grid" }}>
                            <p className="text-muted mb-2">Quantity</p>
                            <div
                              className="product-cart-touchspin"
                              style={{ width: "110px", justifySelf: "center" }}
                            >
                              <div className="">
                                <h5 className="font-size-16">{item.Quantity}</h5>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="mt-3">
                            <p className="text-muted mb-2">Total</p>
                            <h5 className="font-size-16">
                              {item.Book.price * item.Quantity}
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className="modal fade flip"
        id="deleteOrder"
        tabIndex="-1"
        style={{ display: "none" }}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body p-5 text-center">
              <lord-icon
                src="https://cdn.lordicon.com/gsqxdxog.json"
                trigger="loop"
                colors="primary:#405189,secondary:#f06548"
                style={{ width: "90px", height: "90px" }}
              ></lord-icon>
              <div className="mt-4 text-center">
                <h4>You are about to delete a order ?</h4>
                <p className="text-muted fs-15 mb-4">
                  Deleting your order will remove all of your information from
                  our database.
                </p>
                <div className="hstack gap-2 justify-content-center remove">
                  <button
                    className="btn btn-link link-success fw-medium text-decoration-none"
                    id="deleteRecord-close"
                    data-bs-dismiss="modal"
                  >
                    <i className="ri-close-line me-1 align-middle"></i> Close
                  </button>
                  <button
                    className="btn btn-danger delete-record"
                    onClick={() => {
                      confirmdelete();
                    }}
                  >
                    Yes, Delete It
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="showModal"
        aria-hidden="true"
        style={{ display: "none" }}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-light p-3">
              <h5 className="modal-title" id="exampleModalLabel">
                My Order
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="close-modal"
              ></button>
            </div>
            <form action="#">
              <div className="modal-body" style={{textAlign:"justify"}}>
                <input type="hidden" id="id-field"></input>
                <div className="mb-3" id="modal-name">
                  <label for="orderId" className="form-label">
                    User
                  </label>
                  <input
                    type="text"
                    id="orderId"
                    className="form-control"
                    placeholder="Name"
                    readonly=""
                  />
                </div>
                <div className="mb-3" id="modal-address">
                  <label for="orderAddress" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    id="orderAddress"
                    className="form-control"
                    placeholder="Address"
                    readonly=""
                  />
                </div>
                <div className="mb-3" id="modal-email">
                  <label for="orderEmail" className="form-label">
                    Email
                  </label>
                  <input
                    type="text"
                    id="orderEmail"
                    className="form-control"
                    placeholder="Email"
                    readonly=""
                  />
                </div>
                <div className="mb-3" id="modal-phone">
                  <label for="orderPhone" className="form-label">
                    Phone
                  </label>
                  <input
                    type="text"
                    id="orderPhone"
                    className="form-control"
                    placeholder="Phone"
                    readonly=""
                  />
                </div>
                <div className="row gy-4 mb-3">
                  <div className="col-md-6">
                    <div>
                      <label for="Shipping-field" className="form-label">
                        Shipping
                      </label>
                      <input
                        type="text"
                        id="Shipping"
                        className="form-control"
                        placeholder="Shipping"
                        readonly=""
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div>
                      <label for="payment-field" className="form-label">
                        Payment Method
                      </label>
                      <input
                        type="text"
                        id="payment"
                        className="form-control"
                        placeholder="Payment"
                        readonly=""
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-3" id="modal-Date">
                  <label for="orderDate" className="form-label">
                    Time Order
                  </label>
                  <input
                    type="text"
                    id="orderTime"
                    className="form-control"
                    placeholder="Date"
                    readonly=""
                  />
                </div>
                <div className="row gy-4 mb-3">
                  <div className="col-md-4">
                    <div>
                      <label for="country-field" className="form-label">
                        Country
                      </label>
                      <input
                        type="text"
                        id="country"
                        className="form-control"
                        placeholder="Country"
                        readonly=""
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div>
                      <label for="city-field" className="form-label">
                        City
                      </label>
                      <input
                        type="text"
                        id="City"
                        className="form-control"
                        placeholder="City"
                        readonly=""
                      />
                    </div>
                    
                  </div>
                  <div className="col-md-4">
                    <div>
                      <label for="zip-field" className="form-label">
                        Zip Code
                      </label>
                      <input
                        type="text"
                        id="zipcode"
                        className="form-control"
                        placeholder="Zip-Code"
                        readonly=""
                      />
                    </div>
                    
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
