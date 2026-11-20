import axios from "axios";
import { use, useEffect, useState } from "react";
import API_URL from "../../config";
import { useNavigate } from "react-router-dom";

function AddProduct(props) {
  const navigate = useNavigate()
  const token = localStorage.getItem("token");
  const [brands, setBrands] = useState([]);
  const [category, setCategory] = useState([]);
  const [errs, setErrs] = useState({});

  const [products, setProduct] = useState({
    name: "",
    price: "",
    id_category: "",
    id_brand: "",
    status: "0",
    sale: "",
    company: "",
    image: [],
    detail: "",
  });

  useEffect(() => {
    axios
      .get(`${API_URL}/api/account/add-product`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        setBrands(res.data.brand);
        setCategory(res.data.category);
      })
      .catch((err) => console.log(err));
  }, [token]);

  function handleInput(e) {
    const name = e.target.name;
    const value = e.target.value;

    setProduct((state) => ({
      ...state,
      [name]: value,
    }));
  }

  function handleFile(e) {
    const files = Array.from(e.target.files);
    let errorsSubmit = {};
    let flag = true;

    if (files.length > 3) {
      errorsSubmit.image = "Chỉ được chọn tối đa 3 ảnh";
      flag = false;
    }

    files.forEach((file) => {
      const nameFile = file.name;
      const typeFile = nameFile.split(".").pop().toLowerCase();
      const type = ["png", "jpg", "jpeg"];

      if (!type.includes(typeFile)) {
        errorsSubmit.image = "Chỉ được chọn file PNG, JPG, JPEG";
        flag = false;
      }
      if (file.size > 1024 * 1024) {
        errorsSubmit.image = "Dung lượng mỗi ảnh không được vượt quá 1MB";
        flag = false;
      }
    });

    if (!flag) {
      setErrs((state) => ({
        ...state,
        image: errorsSubmit.image,
      }));

      setProduct((state) => ({
        ...state,
        image: [],
      }));

      e.target.value = "";
      return;
    }

    setProduct((state) => ({
      ...state,
      image: files,
    }));
    setErrs((state) => ({
      ...state,
      image: "",
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    let errorsSubmit = {};
    let flag = true;

    if (products.name === "") {
      errorsSubmit.name = "Vui lòng nhập tên sản phẩm";
      flag = false;
    }

    if (products.price === "") {
      errorsSubmit.price = "Vui lòng nhập giá sản phẩm";
      flag = false;
    }

    if (products.id_category === "") {
      errorsSubmit.id_category = "Vui lòng chọn Category";
      flag = false;
    }

    if (products.id_brand === "") {
      errorsSubmit.id_brand = "Vui lòng chọn Brand";
      flag = false;
    }

    if (products.status === "1" && products.sale === "") {
      errorsSubmit.sale = "Vui lòng nhập giá sale";
      flag = false;
    }

    if (products.company === "") {
      errorsSubmit.company = "Vui lòng nhập Company";
      flag = false;
    }

    if (products.detail === "") {
      errorsSubmit.detail = "Vui lòng nhập chi tiết sản phẩm";
      flag = false;
    }

    if (!flag) {
      return;
    } else {
      const url = `${API_URL}/api/account/add-product`;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      };

      const formData = new FormData();
      formData.append("name", products.name);
      formData.append("price", products.price);
      formData.append("id_category", products.id_category);
      formData.append("id_brand", products.id_brand);
      formData.append("status", products.status);
      formData.append("sale", products.sale);
      formData.append("company", products.company);
      formData.append("detail", products.detail);
      products.image.map((item, i) => {
        formData.append("image[]",item)
      });

      axios.post(url, formData, config)
      .then((res) =>{
        alert("Thêm sản phẩm thành công")
        navigate('/account/product')
      })
      .catch(err => console.log(err))
    }
  }

  return (
    <>
      return (
      <div className="col-sm-9">
        <div className="blog-post-area">
          <h2 className="title text-center">Add Product</h2>

          <div className="signup-form">
            <h2>New Product</h2>

            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                placeholder="Name"
                name="name"
                id="name"
                value={products.name}
                onChange={handleInput}
              />

              <label htmlFor="price">Price</label>
              <input
                type="number"
                placeholder="Price"
                name="price"
                id="price"
                value={products.price}
                onChange={handleInput}
              />

              <label htmlFor="id_category">Category</label>
              <select
                name="id_category"
                id="id_category"
                value={products.id_category}
                onChange={handleInput}
              >
                <option value="">Select Category</option>
                {category.map((ct) => (
                  <option key={ct.id} value={ct.id}>
                    {ct.name}
                  </option>
                ))}
              </select>

              <label htmlFor="id_brand">Brand</label>
              <select
                name="id_brand"
                id="id_brand"
                value={products.id_brand}
                onChange={handleInput}
              >
                <option value="">Select Brand</option>
                {brands.map((br) => (
                  <option key={br.id} value={br.id}>
                    {br.name}
                  </option>
                ))}
              </select>

              <label htmlFor="status">Status</label>
              <select
                name="status"
                id="status"
                value={products.status}
                onChange={handleInput}
              >
                <option value="0">New</option>
                <option value="1">Sale</option>
              </select>

              {products.status === "1" && (
                <div id="sale-box">
                  <label htmlFor="sale">Giá sale (%)</label>
                  <input
                    type="number"
                    name="sale"
                    id="sale"
                    placeholder="Nhập giá sale"
                    value={products.sale}
                    onChange={handleInput}
                  />
                </div>
              )}

              <label htmlFor="company">Company</label>
              <input
                type="text"
                placeholder="Company"
                name="company"
                id="company"
                value={products.company}
                onChange={handleInput}
              />

              <label htmlFor="files">Select files:</label>
              <input
                type="file"
                id="files"
                name="image[]"
                multiple
                onChange={handleFile}
              />

              <br />
              <br />

              <label htmlFor="detail">Detail</label>
              <textarea
                name="detail"
                id="detail"
                placeholder="Nhập chi tiết sản phẩm"
                value={products.detail}
                onChange={handleInput}
              />

              <button type="submit" className="btn btn-default">
                Add Product
              </button>
            </form>
          </div>
        </div>
      </div>
      )
    </>
  );
}
export default AddProduct;
