import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_URL from "./../../config";

function CommentList(props) {
  const [cmt, setCmt] = useState([]);
  const [activeReply, setActiveReply] = useState(null);

  const [comment, setComment] = useState("");
  const [replyComment, setReplyComment] = useState("");

  useEffect(() => {
    axios
      .get(`${API_URL}/api/blog/comment/${props.blogId}`)
      .then((res) => {
        console.log("Danh sách comment:", res.data.comments);
        setCmt(res.data.comments || []);
      })
      .catch((err) => console.log(err));
  }, [props.blogId]);

  const parentComments = cmt.filter((comment) => Number(comment.level) === 0);
  const childComments = cmt.filter((comment) => Number(comment.level) !== 0);

  function handleTextArea(e) {
    setComment(e.target.value);
  }
  function handlePostComment() {
    const token = localStorage.getItem("token");
    const useData = JSON.parse(localStorage.getItem("Auth"));
    const url = `${API_URL}/api/blog/comment/add`;

    if (!token) {
      alert("Vui lòng đăng nhập để bình luận");
      return;
    }
    if (!comment.trim()) {
      alert("Vui lòng nhập bình luận");
      return;
    }

    const config = {
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      },
    };

    if (comment) {
      const formData = new FormData();
      formData.append("id_blog", props.blogId);
      formData.append("id_user", useData.id);
      formData.append("name_user", useData.name);
      formData.append("avt_user", useData.avatar);
      formData.append("level", 0);
      formData.append("cmt", comment);

      axios
        .post(url, formData, config)
        .then((res) => {
          setCmt((prev) => [...prev, res.data.comment]);
          setComment("");
        })
        .catch((err) => console.log(err));
    }
  }

  function handleFormReply(e) {
    setReplyComment(e.target.value);
  }

  function handleReplyComment(parentId) {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("Auth"));
    const url = `${API_URL}/api/blog/comment/add`;

    if (!token) {
      alert("Vui lòng đăng nhập để bình luận");
      return;
    }
    const config = {
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      },
    };
    if (replyComment) {
      const formData = new FormData();
      formData.append("id_blog", props.blogId);
      formData.append("id_user", user.id);
      formData.append("name_user", user.name);
      formData.append("cmt", replyComment);
      formData.append("avt_user", user.avatar);
      formData.append("level", parentId);

      axios
        .post(url, formData, config)
        .then((res) => {
          setCmt((prev) => [...prev, res.data.comment]);
          setReplyComment("");
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <>
      <div className="response-area">
        <h2>{cmt.length} RESPONSES</h2>

        <ul className="media-list">
          {parentComments.map((comment) => {
            return (
              <li className="media" key={comment.id}>
                <Link className="pull-left" to="#">
                  <img
                    className="media-object"
                    src={`${API_URL}/admin/assets/images/users/${comment.avt_user}`}
                    alt={comment.name_user}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                </Link>

                <div className="media-body">
                  <ul className="sinlge-post-meta">
                    <li>
                      <i className="fa fa-user"></i> {comment.name_user}
                    </li>
                    <li>
                      <i className="fa fa-clock-o"></i> 1:33 pm
                    </li>
                    <li>
                      <i className="fa fa-calendar"></i> {comment.time}
                    </li>
                  </ul>

                  <p>{comment.cmt}</p>

                  <button
                    type="button"
                    className="btn btn-primary reply"
                    onClick={() =>
                      setActiveReply(
                        activeReply === comment.id ? null : comment.id,
                      )
                    }
                  >
                    <i className="fa fa-reply"></i> Reply
                  </button>
                  {activeReply === comment.id && (
                    <div className="reply-form" style={{ marginTop: "15px" }}>
                      <textarea
                        value={replyComment}
                        onChange={handleFormReply}
                        rows="3"
                        className="form-control reply_message"
                        placeholder="Write a reply..."
                      ></textarea>
                      <button
                        onClick={() => handleReplyComment(comment.id)}
                        className="btn btn-primary btn-sm post-reply"
                        style={{ marginTop: "5px" }}
                      >
                        Submit Reply
                      </button>
                    </div>
                  )}
                </div>
                {childComments
                  .filter((child) => Number(child.level) === Number(comment.id))
                  .map((child) => {
                    return (
                      <div className="media second-media" key={child.id}>
                        <Link className="pull-left" to="#">
                          <img
                            className="media-object"
                            src={`${API_URL}/admin/assets/images/users/${child.avt_user}`}
                            alt={child.name_user}
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                              objectFit: "cover",
                            }}
                          />
                        </Link>

                        <div className="media-body">
                          {/* Thông tin comment con */}
                          <ul className="sinlge-post-meta">
                            <li>
                              <i className="fa fa-user"></i> {child.name_user}
                            </li>

                            <li>
                              <i className="fa fa-calendar"></i> {child.time}
                            </li>
                          </ul>

                          {/* Nội dung comment con */}
                          <p>{child.cmt}</p>
                        </div>
                      </div>
                    );
                  })}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="replay-box">
        <div className="row">
          <div className="col-sm-12">
            <h2>Leave a replay</h2>

            <div className="text-area">
              <div className="blank-arrow">
                <label>Your Name</label>
              </div>
              <span>*</span>
              <textarea
                name="cmt"
                rows="11"
                className="comment_message"
                value={comment}
                onChange={handleTextArea}
              ></textarea>

              <button
                type="button"
                className="btn post"
                onClick={handlePostComment}
              >
                Post Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CommentList;
