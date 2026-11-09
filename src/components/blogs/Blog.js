import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Blog(props) {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/blog")
      .then((res) => {
        console.log(res.data);
        

        setBlogs(res.data.blog);
      })
      .catch((err) => {
        console.error("Unable to load blogs:", err);
        setBlogs([]);
      });
  }, []);

  return (
    <section>
          <div className="col-sm-9">
            <div className="blog-post-area">
            <h2 className="title text-center">
                Latest From our Blog
            </h2>

            {blogs.map((blog) => (
                <div className="single-blog-post" key={blog.id}>
                    <h3>{blog.title}</h3>

                    <div className="post-meta">
                        <ul>
                            <li>
                                <i className="fa fa-user"></i> Mac Doe
                            </li>

                            <li>
                                <i className="fa fa-clock-o"></i> 1:33 pm
                            </li>

                            <li>
                                <i className="fa fa-calendar"></i>
                                {" "}
                                {new Date(blog.created_at).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "2-digit",
                                    year: "numeric"
                                })}
                            </li>
                        </ul>

                        <span>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star-half-o"></i>
                        </span>
                    </div>
                    
                    <a href="#">
                        <img
                            className="blog-image"
                            src={`http://127.0.0.1:8000/admin/assets/images/blogs/${blog.image}`}
                            alt=""
                        />
                    </a>

                    <p>{blog.description}</p>

                    <Link className="btn btn-primary" to={`/blog-detail/${blog.id}`}  >Read More</Link>
                </div>
            ))}
            </div>
          </div>
    </section>
  );
}

export default Blog;
