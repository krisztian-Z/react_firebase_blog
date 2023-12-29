import React from "react";
import FontAwesome from "react-fontawesome";
import { Link } from "react-router-dom";
// import Tags from "./Tags";
import { excerpt } from "../utility/index";

const BlogSection = ({ id, title, description, category, imgUrl, author, timestamp, user, tags, userId, handleDelete }) => {
  const shortDescription = excerpt(description, 100);

  return (
    <div>
      <div className="row pb-4" key={id}>
        <div className="col-md-5">
          <div className="hover-blogs-img">
            <div className="blogs-img">
              <img src={imgUrl} alt={title} />
              <div></div>
            </div>
          </div>
        </div>
        <div className="col-md-7">
          <div className="text-start">
            <h6 className="category catg-color">{category}</h6>
            <span className="title py-2">{title}</span>
            <span className="meta-info">
              <p className="author">{author}</p> -&nbsp;
              {timestamp.toDate().toDateString()}
            </span>
          </div>
          <div className="short-description text-start">{shortDescription}</div>
          {description.length > 100 && (
            <Link to={`/detail/${id}`}>
              <button className="btn btn-read">Read more</button>
            </Link>
          )}
          {user && user.uid === userId && (
            <div style={{ float: "right" }}>
              <FontAwesome
                name="trash"
                style={{ margin: "20px", cursor: "pointer" }}
                size="2x"
                onClick={() => handleDelete(id)}
              />
              <Link to={`/update/${id}`}>
                <FontAwesome
                  name="edit"
                  style={{ cursor: "pointer" }}
                  size="2x"
                />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogSection;

