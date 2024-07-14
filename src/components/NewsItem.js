import React from "react";

export default function NewsItem(props) {
  let { title, descripition, urlImage, newsUrl, author, date } = props;
  return (
    <div className="card">
      <img
        src={
          urlImage
            ? urlImage
            : "https://images.indianexpress.com/2022/09/azad-party-logo-1.jpg"
        }
        className="card-img-top"
        style={{ height: "200px" }}
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">{title}...</h5>
        <p className="card-text">{descripition}...</p>
        <p className="card-text">
          <small className="text-muted">
            By {author ? author : "Unknown"} on{" "}
            {new Date(date)
              .toUTCString()
              .slice(0, new Date(date).toUTCString().length - 4)}
          </small>
        </p>
        <a
          href={newsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-sm btn-primary"
        >
          Read More
        </a>
      </div>
    </div>
  );
}
