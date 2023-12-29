import React from "react";
import { useNavigate } from "react-router-dom";

const Popular = ({ blogs, currentBlogId }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <div className="blog-heading text-start pt-3 py-2 mb-4">
          Most Popular
        </div>
        {blogs?.map((item) => (
          <div
            className="row pb-3"
            key={item.id}
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/detail/${item.id}`)}
          >
            <div className="col-5 align-self-center">
              <img
                src={item.imgUrl}
                alt={item.title}
                className="most-popular-img"
              />
            </div>
            <div className="col-7 padding">
              <div className="text-strat post-popular-font">
                {item.title}
              </div>
              <div className="text-strat post-popular-font-meta">
                {item.timestamp.toDate().toDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Popular;
