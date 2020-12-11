import * as React from "react";
import Banner from "../images/banner.png";

export default ({ keyword, onChangeKeyword, onBannerFormSubmit }) => {
  return (
    <section
      className="bg-default-img img-fluid"
      style={{ backgroundImage: `url(${Banner})` }}
    >
      <div className="container search-box">
        <div className="row justify-content-center">
          <div className="col-lg-8 my-auto">
            <div className="py-4 py-lg-5">
              <form
                action="/search"
                className="p-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  onBannerFormSubmit();
                }}
              >
                <div className="input-group">
                  <input
                    type="text"
                    name="keyword"
                    className="form-control"
                    onChange={onChangeKeyword}
                    value={keyword}
                    placeholder="Search by Job Title"
                  />
                  <span className="input-group-append">
                    <button
                      type="submit"
                      id="search-button"
                      className="btn btn-success text-white"
                    >
                      <span id="search_icon">
                        <span className="icon-search mr-1"></span>
                      </span>
                      <span id="search_text"> SEARCH JOBS</span>
                    </button>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
