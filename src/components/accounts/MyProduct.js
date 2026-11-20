import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "./../../config";
import { Link } from "react-router-dom";

function Myproduct() {
  const [products, setProduct] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get(`${API_URL}/api/account/product`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        setProduct(res.data.product);
      })
      .catch((err) => console.log(err));
  }, [token]);

  return (
    <>
      <div class="col-sm-9">
        <div class="table-responsive cart_info">
          <table class="table table-condensed">
            <thead>
              <tr class="cart_menu">
                <td class="image">id</td>
                <td class="image">image</td>
                <td class="description">name</td>
                <td class="price">price</td>

                <td class="total">action</td>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const images = JSON.parse(product.image);

                return (
                  <tr key={product.id}>
                    <td className="cart_description">
                      <h4>{product.id}</h4>
                    </td>

                    <td className="cart_product">
                      <img
                        src={`${API_URL}/user/images/product-details/${images[0]}`}
                        alt={product.name}
                        width="80"
                        height="80"
                      />
                    </td>

                    <td className="cart_description">{product.name}</td>

                    <td className="cart_price">
                      <p>{product.price}</p>
                    </td>

                    <td className="cart_total">
                      <a>
                        <Link to={`/account/edit-product/${product.id}`} >Edit</Link>
                      </a>
                      <a href={`/shop/account/delete-product/${product.id}`}>
                        delete
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default Myproduct;
