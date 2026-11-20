import axios from "axios";
import { useEffect, useState } from "react";
import API_URL from "./../../config";

function Account(props) {
  const user = JSON.parse(localStorage.getItem("Auth"));
  const [account, setAccount] = useState({
   name: user?.name || "",
  email: user?.email || "",
  password: "",
  phone: user?.phone || "",
  address: user?.address || "",
  id_country: user?.id_country || "",
  avatar: null,
  file: null,
  });
  const [errs, setErrs] = useState({});
  const token = localStorage.getItem("token");

  const [country, setCountry] = useState([]);
  useEffect(() => {
    axios
      .get(`${API_URL}/api/account`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        setCountry(res.data.country);
      })
      .catch((err) => console.log(err));
  }, [token]);
  
  const errorsSubmit = {};
  let flag = true;
  function handleInput(e) {
    const name = e.target.name;
    const value = e.target.value;

    setAccount((state) => ({
      ...state,
      [name]: value,
    }));
  }

  function handleFile(e) {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const nameFile = file.name;
    const typeFile = nameFile.split(".").pop();
    const type = ["png", "jpg", "jpeg"];

    if (!type.includes(typeFile)) {
      errorsSubmit.avatar = "Chỉ được chọn file PNG, JPG, JPEG";
      flag = false;
    }

    if (file.size > 1024 * 1024) {
      errorsSubmit.avatar = "Dung lượng ảnh không được vượt quá 1MB";
      flag = false;
    }

    if (!flag) {
      setErrs((state) => ({
        ...state,
        ...errorsSubmit,
      }));

      setAccount((state) => ({
        ...state,
        avatar: null,
        file: null,
      }));

      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setAccount((state) => ({
        ...state,
        avatar: e.target.result,
        file: file,
      }));

      setErrs((state) => ({
        ...state,
        avatar: "",
      }));
    };
    reader.readAsDataURL(file);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (account.name === "") {
      errorsSubmit.name = "Vui lòng nhập UserName";
      flag = false;
    }

    if (account.email === "") {
      errorsSubmit.email = "Vui lòng nhập Email";
      flag = false;
    }


    if (account.phone === "") {
      errorsSubmit.phone = "Vui lòng nhập Phone";
      flag = false;
    }

    if (account.address === "") {
      errorsSubmit.address = "Vui lòng nhập Address";
      flag = false;
    }
    if (account.id_country === "") {
      errorsSubmit.id_country = "Vui lòng nhập Country";
      flag = false;
    }

    setErrs(errorsSubmit);
    if (!flag) {
      return;
    } else {
      const data = {
        name: account.name,
        email: account.email,
        password: account.password,
        phone: account.phone,
        address: account.address,
        id_country: account.id_country,
        avatar: account.avatar,
      };
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }

      axios.post(`${API_URL}/api/account/update`, data, config)
      .then((res) => {
        console.log(res.data)
        if(res.data.success){
          localStorage.setItem("Auth", JSON.stringify(res.data.account))
          setAccount(res.data.account);
        }
        alert("Update User thành công")
      })
      .catch(err =>{
        console.log("Status:", err.response?.status);
        console.log("Data:", err.response?.data);
      })
    }
  }

  return (
    <div className="col-sm-9">
      <div className="blog-post-area">
        <h2 className="title text-center">Update user</h2>
        <div className="signup-form">
          <h2>Update User</h2>
          <form
            className="form-horizontal form-material"
            method="post"
            action="/shop/account/update"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <label className="col-md-12" htmlFor="image">
                Avatar
              </label>
              <div className="col-md-12">
                <input
                  type="file"
                  id="image"
                  name="avatar"
                  onChange={handleFile}
                  className="form-control form-control-line"
                />
                {user?.avatar && (
                  <img
                    id="preview"
                    src={`${API_URL}/admin/assets/images/users/${user.avatar}`}
                    alt="User avatar"
                    className="rounded-circle"
                    width="150"
                  />
                )}
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-12" htmlFor="name">
                Full Name
              </label>
              <div className="col-md-12">
                <input
                  type="text"
                  id="name"
                  value={account.name}
                  onChange={handleInput}
                  name="name"
                  className="form-control form-control-line"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="example-email" className="col-md-12">
                Email
              </label>
              <div className="col-md-12">
                <input
                  type="email"
                  value={account.email}
                  onChange={handleInput}
                  className="form-control form-control-line"
                  name="email"
                  id="example-email"
                  readOnly
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-12" htmlFor="password">
                Password
              </label>
              <div className="col-md-12">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={account.password}
                  onChange={handleInput}
                  className="form-control form-control-line"
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-12" htmlFor="phone">
                Phone
              </label>
              <div className="col-md-12">
                <input
                  type="text"
                  id="phone"
                  value={account.phone}
                  name="phone"
                  onChange={handleInput}
                  placeholder="123 456 7890"
                  className="form-control form-control-line"
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-12" htmlFor="address">
                Address
              </label>
              <div className="col-md-12">
                <textarea
                  id="address"
                  rows="5"
                  value={account.address}
                  onChange={handleInput}
                  className="form-control form-control-line"
                  name="address"
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-12" htmlFor="id_country">
                Select Country
              </label>
              <div className="col-sm-12">
                <select
                  id="id_country"
                  className="form-control form-control-line"
                  name="id_country"
                  value={account.id_country}
                  onChange={handleInput}
                >
                  <option value="">-- Select Country --</option>
                  {country.map((ctr) => {
                    return (
                      <option key={ctr.id} value={ctr.id}>
                        {ctr.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-12">
                <button type="submit" className="btn btn-success">
                  Update Account
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Account;
