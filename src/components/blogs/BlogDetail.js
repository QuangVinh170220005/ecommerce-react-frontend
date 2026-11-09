import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

function BlogDetail(props){
    const {id} = useParams()
    const [blogDetail, setBlogDetail] = useState([])
    useEffect(() =>{
        axios.get(`http://127.0.0.1:8000/api/blog/detail/${id}`)
        .then((res) =>{
            setBlogDetail(res.data.blog)
        })
        .catch(err => console.log(err))
    }, [id])

    if (!blogDetail) {
        return <div className="blog-post-area"><h2 className="title text-center">Loading...</h2></div>
    }

    return (
        <div className="col-sm-9">
            <div className="blog-post-area">
                <h2 className="title text-center">Latest From our Blog</h2>

                <div className="single-blog-post">
                    <h3>{blogDetail.title}</h3>

                    <div className="post-meta">
                        <ul>
                            <li><i className="fa fa-user"></i> Mac Doe</li>
                            <li><i className="fa fa-clock-o"></i> 1:33 pm</li>
                            <li><i className="fa fa-calendar"></i> {new Date(blogDetail.created_at).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}</li>
                        </ul>

                        <span>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star-o"></i>
                        </span>
                    </div>

                    <Link to="#">
                        <img src={`http://127.0.0.1:8000/admin/assets/images/blogs/${blogDetail.image}`} alt={blogDetail.title}/>
                    </Link>

                    <p>{blogDetail.description}</p>

                    <div dangerouslySetInnerHTML={{ __html: blogDetail.content }}></div>

                    <div className="pager-area">
                        <ul className="pager pull-right">
                            <li><Link to="#">Pre</Link></li>
                            <li><Link to="#">Next</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="rating-area">
                <ul className="ratings">
                    <li className="rate-this">Rate this item:</li>
                    <li>
                        <div className="rate">
                            <div className="vote">
                                <div className="star_1 ratings_stars"><input value="1" type="hidden" /></div>
                                <div className="star_2 ratings_stars"><input value="2" type="hidden" /></div>
                                <div className="star_3 ratings_stars"><input value="3" type="hidden" /></div>
                                <div className="star_4 ratings_stars"><input value="4" type="hidden" /></div>
                                <div className="star_5 ratings_stars"><input value="5" type="hidden" /></div>
                                <span className="rate-np">4</span>
                            </div>
                        </div>
                    </li>
                    <li className="color">(6 votes)</li>
                </ul>

                <ul className="tag">
                    <li>TAG:</li>
                    <li><Link className="color" to="#">Pink <span>/</span></Link></li>
                    <li><Link className="color" to="#">T-Shirt <span>/</span></Link></li>
                    <li><Link className="color" to="#">Girls</Link></li>
                </ul>
            </div>

            <div className="socials-share">
                <Link to="#"><img src="/images/blog/socials.png" alt="Socials" /></Link>
            </div>

            <div className="media commnets">
                <Link className="pull-left" to="#">
                    <img className="media-object" src="/images/blog/man-one.jpg" alt="User" />
                </Link>

                <div className="media-body">
                    <h4 className="media-heading">Annie Davis</h4>

                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>

                    <div className="blog-socials">
                        <ul>
                            <li><Link to="#"><i className="fa fa-facebook"></i></Link></li>
                            <li><Link to="#"><i className="fa fa-twitter"></i></Link></li>
                            <li><Link to="#"><i className="fa fa-dribbble"></i></Link></li>
                            <li><Link to="#"><i className="fa fa-google-plus"></i></Link></li>
                        </ul>

                        <Link className="btn btn-primary" to="#">Other Posts</Link>
                    </div>
                </div>
            </div>

            <div className="response-area">
                <h2>3 RESPONSES</h2>

                <ul className="media-list">
                    <li className="media">
                        <Link className="pull-left" to="#">
                            <img className="media-object" src="/images/blog/man-one.jpg" alt="User" style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover" }} />
                        </Link>

                        <div className="media-body">
                            <ul className="sinlge-post-meta">
                                <li><i className="fa fa-user"></i> John Doe</li>
                                <li><i className="fa fa-clock-o"></i> 1:33 pm</li>
                                <li><i className="fa fa-calendar"></i> Nov 03, 2026</li>
                            </ul>

                            <p>This is a sample comment.</p>

                            <button type="button" className="btn btn-primary reply">
                                <i className="fa fa-reply"></i> Reply
                            </button>

                            <div className="reply-form" style={{ marginTop: "15px" }}>
                                <textarea rows="3" className="form-control reply_message" placeholder="Write a reply..."></textarea>
                                <button className="btn btn-primary btn-sm post-reply" style={{ marginTop: "5px" }}>Submit Reply</button>
                            </div>
                        </div>
                    </li>

                    <li className="media second-media">
                        <Link className="pull-left" to="#">
                            <img className="media-object" src="/images/blog/man-one.jpg" alt="User" style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover" }} />
                        </Link>

                        <div className="media-body">
                            <ul className="sinlge-post-meta">
                                <li><i className="fa fa-user"></i> Jane Doe</li>
                                <li><i className="fa fa-clock-o"></i> 1:40 pm</li>
                                <li><i className="fa fa-calendar"></i> Nov 03, 2026</li>
                            </ul>

                            <p>This is a sample reply.</p>
                        </div>
                    </li>
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

                            <textarea name="cmt" rows="11" className="comment_message"></textarea>

                            <button className="btn post">Post Comment</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default BlogDetail