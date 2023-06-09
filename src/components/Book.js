import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  deleteBook,
  GetAllBook,
  createBook,
  updateBook,
} from "../redux/actions/book";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "../css/bodypage.css";
import $ from "jquery";
import $$ from "jquery";
import { Link } from "react-router-dom";

const Book = () => {
  const categorys = [
    "Trinh thám",
    "Tiểu thuyết",
    "Hài hước",
    "Kinh dị",
    "Truyện ngắn",
    "Truyện ngụ ngôn",
    "Truyện dân gian",
    "Truyện thiếu nhi",
  ];
  const bookdata = useSelector((state) => state.book.data.book);
  const roles = localStorage.getItem("roles");
  const [books, setBooks] = useState(bookdata);
  const token = localStorage.getItem("token");
  const location = useLocation();
  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [Show, setShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [indexBook, setIndexBook] = useState(null);
  const [err, SetErr] = useState(false);
  useEffect(() => {
    dispatch(GetAllBook());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
  useEffect(() => {
    setBooks(bookdata);
  }, [bookdata]);
  function removebook() {
    var bookid = $(".confirmdel").attr("id");
    if (bookid) {
      dispatch(deleteBook(bookid));
      const tmpbook = books.filter((book) => book._id !== bookid);
      setBooks(tmpbook);
    }
  }
  function confirmdel(id) {
    $(".confirmdel").attr({
      id: id,
    });
  }
  const cancelClick = () => {
    setIsShow(false);
    setIsAdd(false);
    setShow(false);
    setSelectedImage(null);
    document.querySelector(".form-post").classList.remove("active");
    $$(".star").attr({
      checked: false,
    });
    $$("input").attr({
      disabled: true,
    });
    $(".savebtn").addClass("disabled");
    $(".addbtn").addClass("disabled");
    $(".editbtn").addClass("disabled");
    $$("select").attr({
      disabled: true,
    });
    $("#description").attr({
      disabled: true,
    });
    document.getElementById("title").value = null;
    document.getElementById("author").value = null;
    document.getElementById("description").value = null;
    document.getElementById("release").value = null;
    document.getElementById("page_number").value = null;
    document.getElementById("category").value = 0;
    document.getElementById("price").value = null;
    document.querySelector(".img-field").src = null;
  };
  useEffect(() => {
    if (err === true) {
      document.querySelector(".msg-log").textContent =
        "Vui lòng nhập đầy đủ thông tin";
      document.querySelector(".msg-log").classList.add("active");
      setTimeout(() => {
        document.querySelector(".msg-log").classList.remove("active");
        SetErr(false);
      }, 1000);
      console.log("ERORR");
    }
    return () => console.log("");
  }, [err]);
  const popUpActive = (mode) => {
    setIsShow(true);
    document.querySelector(".form-post").classList.add("active");
    if (mode === "edit") {
      document.querySelector(".dialog__title").textContent = "Sửa sách";
      $(".addbtn").addClass("disabled");
      $(".editbtn").removeClass("disabled");
    } else {
      document.querySelector(".dialog__title").textContent = "Thêm sách";
      $(".addbtn").removeClass("disabled");
    }
  };
  const onclickAdd = () => {
    $(".addbtn").addClass("disabled");
    $(".savebtn").removeClass("disabled");
    $$("input").removeAttr("disabled");
    $$("select").removeAttr("disabled");
    $$("textarea").removeAttr("disabled");
    setIsAdd(true);
  };
  const onclickEdit = (index) => {
    popUpActive("edit");
    setIsShow(true);
    setIsAdd(false);
    setIndexBook(index);
    document.getElementById("title").value = books[index].title;
    document.getElementById("author").value = books[index].author;
    document.getElementById("description").value = books[index].description;
    document.getElementById("release").value = books[index].release;
    document.getElementById("page_number").value = books[index].page_number;
    document.getElementById("price").value = books[index].price;
    document.querySelector(".img-field").src = books[index].image;
    categorys.forEach((val, i) => {
      if (books[index].category === val)
        document.getElementById("category").value = i;
    });
    $("img-field").attr({
      src: books[index].image,
    });
  };
  const clickedit = () => {
    $(".addbtn").addClass("disabled");
    $(".savebtn").removeClass("disabled");
    $$("input").removeAttr("disabled");
    $$("select").removeAttr("disabled");
    $$("textarea").removeAttr("disabled");
    setIsAdd(false);
  };
  const addBook = () => {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const description = document.getElementById("description").value;
    const release = document.getElementById("release").value;
    const Page_number = document.getElementById("page_number").value;
    const price = document.getElementById("price").value;
    const selected = document.getElementById("category");
    const img = selectedImage;
    const category = selected.options[selected.selectedIndex].text;
    if (title === "" || author === "" || release === "" || selected === "") {
      SetErr(true);
      return;
    }
    const data = {
      title: title,
      author: author,
      description: description,
      category: category,
      release: release,
      page_number: Page_number,
      price: price,
      image: img,
    };

    dispatch(createBook(data));
    window.location.reload();
    cancelClick();
  };
  const imgfile = (e) => {
    const img123 = document.querySelector(".img-field");
    let target = e.target;
    let reader = new FileReader();
    reader.readAsDataURL(target.files[0]);
    reader.onload = function () {
      let dataUrl = reader.result;
      img123.src = dataUrl;
      setSelectedImage(dataUrl);
    };
  };
  const editBook = () => {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const description = document.getElementById("description").value;
    const release = document.getElementById("release").value;
    const Page_number = document.getElementById("page_number").value;
    const price = document.getElementById("price").value;
    const selected = document.getElementById("category");
    const category = selected.options[selected.selectedIndex].text;
    const img = selectedImage;
    if (title === "" || author === "" || release === "" || selected === "") {
      SetErr(true);
      return;
    }
    const data = {
      title: title,
      author: author,
      description: description,
      category: category,
      release: release,
      page_number: Page_number,
      price: price,
      image: img,
    };
    dispatch(updateBook(books[indexBook]._id, data));
    let tmpbook = books;
    tmpbook.title = title;
    tmpbook.author = author;
    tmpbook.description = description;
    tmpbook.category = category;
    tmpbook.release = release;
    tmpbook.page_number = Page_number;
    tmpbook.price = price;
    tmpbook.image = img;
    setBooks(tmpbook);
    window.location.reload();
    cancelClick();
  };
  const addOrUpdateItem = () => {
    if (isAdd) {
      addBook();
    } else {
      editBook();
    }
  };
  return (
    <div className="body_wrapper ">
      <div style={{ display: isShow ? "block" : "none" }} className="modal">
        <div className="modal_overlay"></div>
        {/*__________________________________________ Form Book _______________________________________*/}
        <div className="form-post">
          <div className="form-post__title dialog__title">Thêm sách</div>
          <div className="form-post__content  needs-validation was-validated">
            <div
              className="form-post__wrapper"
            >
              <div className="form-post__field d-flex ">
                <input
                  className="form-control "
                  style={{ width: "22%", marginRight: "40px" }}
                  type="text"
                  id="title"
                  placeholder="Tiêu đề"
                  disabled
                  required
                />
                <div class="invalid-tooltip">Enter this field!</div>
                <input
                  className="form-control"
                  style={{ width: "22%", marginLeft: "40px" }}
                  type="text"
                  id="author"
                  placeholder="Tác giả"
                  disabled
                  required
                />
                <input
                  type="file"
                  name="Upload"
                  id="urlImage"
                  style={{ transform: "translateX(25%)" }}
                  onChange={(event) => {
                    // setSelectedImage(event.target.files[0]);
                    imgfile(event);
                  }}
                  disabled
                />
              </div>

              <div className="form-post__field d-flex ">
                <textarea
                  style={{ width: "50%", height: "200px" }}
                  id="description"
                  placeholder="Mô tả"
                  disabled
                />
                <div
                  className="img_wrapper"
                  style={{ width: "50%", height: "200px" }}
                >
                  {
                    <div>
                      <img
                        className="img-field"
                        alt="not found"
                        width={"250px"}
                      />
                    </div>
                  }
                </div>
              </div>
              <div className="form-post__field d-flex ">
                <input
                  style={{ width: "22%", marginRight: "40px" }}
                  type="date"
                  id="release"
                  className="form-control"
                  placeholder="Ngày phát hành"
                  disabled
                  required
                />
                <input
                  style={{ width: "22%", marginLeft: "40px" }}
                  type="number"
                  id="page_number"
                  className="form-control"
                  placeholder="Số trang"
                  disabled
                  required
                />
              </div>
              <div className="msg-log">MSG LOG</div>
              <div className="form-post__field d-flex justify-content-start  needs-validation was-validated" noValidate>
                <select style={{ width: "25%" }} id="category" disabled>
                  <option value="0">Trinh thám</option>
                  <option value="1">Hài hước</option>
                  <option value="2">Tiểu thuyết</option>
                  <option value="3">Kinh dị</option>
                  <option value="4">Truyện ngắn</option>
                  <option value="5">Truyện ngụ ngôn</option>
                  <option value="6">Truyện dân gian</option>
                  <option value="7">Truyện thiếu nhi</option>
                </select>
                <input
                  style={{ width: "22%", marginLeft: "40px" }}
                  type="text"
                  pattern="^(([1-9]*)|(([1-9]*)\.([0-9]*)))$"
                  id="price"
                  placeholder="Giá"
                  className="form-control"
                  disabled
                  required
                />
              </div>
            </div>
            <div className="form-post__control">
              <button className="cancel-btn" onClick={() => cancelClick()}>
                Hủy
              </button>
              <button
                className="btn btn-primary savebtn disabled"
                onClick={() => addOrUpdateItem()}
              >
                Save
              </button>
              <button
                className="btn btn-primary editbtn disabled"
                onClick={() => clickedit()}
              >
                Edit
              </button>
              <button
                className="btn btn-primary addbtn disabled"
                onClick={() => onclickAdd()}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* _________________________________________________________Add Button ________________________________________*/}
      <button
        style={{
          display: token && roles === "admin" ? "block" : "none",
        }}
        className="btn-add btn btn-info "
        onClick={() => popUpActive()}
      >
        Thêm Sách
      </button>
      {/*______________________________AdminTable__________________________________________ */}
      <table
        className="table w-75 table-hover table-striped tableadmin table-responsive"
        style={{
          display: token && roles === "admin" ? "block" : "none",
        }}
      >
        <thead className="header_table table-light sticky-table-header">
          <tr>
            <th>#</th>
            <th style={{ width: "150px" }}>Title</th>
            <th style={{ width: "200px" }}>Author</th>
            <th style={{ width: "200px" }}>Category</th>
            <th style={{ width: "200px" }}>Description</th>
            <th style={{ width: "100px" }}>Page Number</th>
            <th style={{ width: "200px" }}>Release</th>
            <th style={{ width: "200px" }}>Option</th>
          </tr>
        </thead>
        {books?.map((item, index) => (
          <tbody key={index} className="table-group-divider">
            <tr>
              <th>{index + 1}</th>
              <td>{item?.title}</td>
              <td>{item?.author}</td>
              <td>{item?.category}</td>
              <td
                style={{
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  maxWidth: "200px",
                }}
              >
                {item?.description}
              </td>
              <td>{item?.page_number}</td>
              <td>{item?.release}</td>
              <td>
                {
                  <div
                    style={{
                      display: token && roles === "admin" ? "block" : "none",
                    }}
                  >
                    <button
                      className="btn btn-primary"
                      onClick={() => onclickEdit(index)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-danger deletebtn"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      id={item?._id}
                      onClick={() => confirmdel(item?._id)}
                    >
                      Delete
                    </button>
                  </div>
                }
              </td>
            </tr>
          </tbody>
        ))}
      </table>
      {/*______________________________UserTable__________________________________________ */}
      <div
        className="cover"
        style={{
          display: !token || roles !== "admin" ? "block" : "none",
        }}
      >
        {books?.map((item, index) => (
          <div className="card card-animate" style={{ width: "18rem" }}>
            <img
              src={item?.image}
              className="card-img-top image"
              id={`Book${index}`}
              alt="not found"
            />
            <div className="card-body">
              <h5 className="card-title title">{item.title}</h5>
              <p className="card-text title">{item.author}</p>
              <Link
                to={{
                  pathname: `/book/${item._id}`,
                }}
                style={{
                  display: token && roles === "user" ? "block" : "none",
                }}
                className="btn btn-success orderbtn"
                id={item?._id}
              >
                <FontAwesomeIcon icon={faTag} style={{ marginRight: "5px" }} />
                Order
              </Link>
            </div>
          </div>
        ))}
      </div>
      {/* ____________________________________Delete Modal___________________________________________ */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Xóa Sách ?
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">bạn có muốn xóa cuốn sách này ?</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                No
              </button>
              <button
                type="button"
                className="btn btn-primary confirmdel"
                onClick={() => removebook()}
                data-bs-dismiss="modal"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Book;
