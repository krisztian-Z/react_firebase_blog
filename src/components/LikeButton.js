import React, { useEffect } from "react";
import { Tooltip } from "bootstrap";

const LikeButton = ({ handleLike, likes, userId }) => {
  useEffect(() => {
    let tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );

    tooltipTriggerList.forEach(function (tooltipTriggerEl) {
      new Tooltip(tooltipTriggerEl);
    });
  }, []);

  const LikeStatus = () => {
    if (likes?.length > 0) {
      return likes.find((id) => id === userId) ? (
        <>
          <i className="bi bi-hand-thumbs-up-fill" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      ) : (
        <>
          <i className="bi bi-hand-thumbs-up" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    return (
      <>
        <i className="bi bi-hand-thumbs-up" />
        &nbsp; Like
      </>
    );
  };

  const handleLikeClick = () => {
    if (userId) {
      handleLike();
    }
  };

  return (
    <span
      style={{ float: "right", cursor: "pointer", marginTop: "-8px" }}
      onClick={handleLikeClick}
    >
      {!userId ? (
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Please login to like post"
        >
          <LikeStatus />
        </button>
      ) : (
        <button type="button" className="btn btn-primary">
          <LikeStatus />
        </button>
      )}
    </span>
  );
};

export default LikeButton;
