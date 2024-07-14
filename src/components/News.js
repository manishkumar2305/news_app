import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spiner from "./Spiner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default function News(props) {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const newsUpdate = async () => {
    props.setProgress(10);

    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=1df06474ff4949c58c316d5c01a5a965&page=${page}&pageSize=${props.pageSize}`;

    setLoading(true);
    let data = await fetch(url);
    let parseData = await data.json();
    props.setProgress(30);
    setResults(parseData.articles);
    setTotalResults(parseData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    newsUpdate();
    document.title = `${capitalizeFirstLetter(props.category)} - Super50 News`;
    // eslint-disable-next-line
  }, []);

  // const prevClickHandle = async () => {
  //   newsUpdate();
  //   setPage(page - 1);
  // };

  // const nextClickHandle = async () => {
  //   if (!(page + 1 > Math.ceil(totalResults / props.pageSize))) {
  //     newsUpdate();
  //     setPage(page + 1);
  //   }
  // };

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=1df06474ff4949c58c316d5c01a5a965&page=${
      page + 1
    }&pageSize=${props.pageSize}`;

    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setResults(results.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };

  return (
    <>
      <div className="container mt-5">
        <h1 className="my-5">
          Super-50 News - Top {capitalizeFirstLetter(props.category)} Headlines
        </h1>
        {loading && <Spiner />}
        <InfiniteScroll
          dataLength={results.length}
          next={fetchMoreData}
          hasMore={results.length !== totalResults}
          loader={<Spiner />}
        >
          <div className="news-items">
            <div className="row">
              {!loading &&
                results.map((element) => {
                  return (
                    <div className="col-md-4 my-4">
                      <NewsItem
                        title={element.title ? element.title.slice(0, 40) : ""}
                        descripition={
                          element.content ? element.content.slice(0, 85) : ""
                        }
                        urlImage={element.urlToImage}
                        newsUrl={element.url}
                        author={element.author}
                        date={element.publishedAt}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </InfiniteScroll>
        <div className="my-5 d-flex justify-content-between">
          {/* <button
            disabled={page <= 1}
            onClick={prevClickHandle}
            type="button"
            className="btn btn-primary"
          >
            {" "}
            &larr; Prev
          </button>
          <button
            disabled={page + 1 > Math.ceil(totalResults / props.pageSize)}
            onClick={nextClickHandle}
            type="button"
            className="btn btn-primary"
          >
            Next &rarr;{" "}
          </button> */}
        </div>
      </div>
    </>
  );
}

News.defaultProps = {
  country: "in",
  category: "general",
  pageSize: 12,
};

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
  pageSize: PropTypes.number,
};
