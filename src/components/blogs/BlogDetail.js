import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CommentList from "./CommentList";
import API_URL from "./../../config";
import Rate from "./Rate";
import { Rating } from "react-simple-star-rating";

function BlogDetail(props) {
  const { id } = useParams();
  const [blogDetail, setBlogDetail] = useState(null);
  const [avgRate, setAvgRate] = useState(0);
  useEffect(() => {
    axios
      .get(`${API_URL}/api/blog/detail/${id}`)
      .then((res) => {
        setBlogDetail(res.data.blog);
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/blog/rate/${id}`)
      .then((res) => {
        console.log(res.data);
        setAvgRate(Number(res.data.avg));
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!blogDetail) {
    return (
      <div className="blog-post-area">
        <h2 className="title text-center">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="col-sm-9">
      <div className="blog-post-area">
        <h2 className="title text-center">Latest From our Blog</h2>

        <div className="single-blog-post">
          <h3>{blogDetail.title}</h3>

          <div className="post-meta">
            <ul>
              <li>
                <i className="fa fa-user"></i> Mac Doe
              </li>
              <li>
                <i className="fa fa-clock-o"></i> 1:33 pm
              </li>
              <li>
                <i className="fa fa-calendar"></i> {blogDetail.created_at}
              </li>
            </ul>

            <span>
              <Rating
                initialValue={avgRate}
                readonly={true}
                allowFraction={true}
                size={20}
                fillColor="gold"
                emptyColor="gray"
              />
              ({avgRate}/5)
            </span>
          </div>

          <Link to="#">
            <img
              src={`${API_URL}/admin/assets/images/blogs/${blogDetail.image}`}
              alt={blogDetail.title}
            />
          </Link>

          <p>{blogDetail.description}</p>

          {/* <div dangerouslySetInnerHTML={{ __html: blogDetail.content }}></div> */}

          <div className="pager-area">
            <ul className="pager pull-right">
              <li>
                <Link to="#">Pre</Link>
              </li>
              <li>
                <Link to="#">Next</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="rating-area">
        <Rate blogId={id} />

        <ul className="tag">
          <li>TAG:</li>
          <li>
            <Link className="color" to="#">
              Pink <span>/</span>
            </Link>
          </li>
          <li>
            <Link className="color" to="#">
              T-Shirt <span>/</span>
            </Link>
          </li>
          <li>
            <Link className="color" to="#">
              Girls
            </Link>
          </li>
        </ul>
      </div>

      <div className="socials-share">
        <Link to="#">
          <img src="/user/images/blog/socials.png" alt="Socials" />
        </Link>
      </div>

      <div className="media commnets">
        <Link className="pull-left" to="#">
          <img
            className="media-object"
            src="/user/images/blog/man-one.jpg"
            alt="User"
          />
        </Link>

        <div className="media-body">
          <h4 className="media-heading">Annie Davis</h4>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>

          <div className="blog-socials">
            <ul>
              <li>
                <Link to="#">
                  <i className="fa fa-facebook"></i>
                </Link>
              </li>
              <li>
                <Link to="#">
                  <i className="fa fa-twitter"></i>
                </Link>
              </li>
              <li>
                <Link to="#">
                  <i className="fa fa-dribbble"></i>
                </Link>
              </li>
              <li>
                <Link to="#">
                  <i className="fa fa-google-plus"></i>
                </Link>
              </li>
            </ul>

            <Link className="btn btn-primary" to="#">
              Other Posts
            </Link>
          </div>
        </div>
      </div>
      <CommentList blogId={id} />
    </div>
  );
}
export default BlogDetail;
