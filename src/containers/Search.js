import * as React from "react";
import axios from "axios";
import BannerSearch from "./BannerSearch";
import { apiPath } from "../utils/Consts";
import { withRouter } from "react-router-dom";
import Loader from "./Loader";
import queryString from "query-string";
import ReactPaginate from "react-paginate";
import Filter from "./Filter";
import JobBoxLg from "./JobBoxLg";

export default withRouter((props) => {
  const [jobs, setJobs] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [jobs_count, setJobsCount] = React.useState("0");
  const [keyword, setKeyword] = React.useState("");

  //for pagination
  const [pageCount, setPageCount] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(0);

  //search based on url query params
  React.useEffect(() => {
    const values = queryString.parse(props.location.search);
    let keyword = values.keyword || " ";
    setKeyword(keyword);

    ajaxFetchJobs({ keyword });
  }, []);

  //fetch jobs via ajax
  const ajaxFetchJobs = async (data) => {
    axios
      .post(`${apiPath}/search`, data)
      .then((response) => {
        if (response.data.resp === 1) {
          handleSuccess(response.data.jobs);
        } else {
          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //update state values
  const handleSuccess = (jobs) => {
    console.log(jobs);
    setJobs(jobs.data);
    setJobsCount(jobs.total);
    setIsLoading(false);
    //for pagination
    setPageCount(Number(jobs.last_page));
  };

  //trace keyword value
  const onChangeKeyword = (e) => {
    setKeyword(e.target.value);
  };

  //reset form handler
  const resetFilter = (e) => {
    e.preventDefault();
    document.getElementById("searchPageForm").reset();
    filterJobs();
  };

  //search based on filter form params & search keyword val
  const filterJobs = () => {
    setIsLoading(true);
    let formData = new FormData(document.getElementById("searchPageForm"));
    formData.append("keyword", keyword);

    ajaxFetchJobs(formData);
    setIsLoading(false);
  };

  //pagination events & function
  const handlePageClick = (data) => {
    console.log(data);
    const selectedPage = data.selected >= 0 ? data.selected + 1 : 0;
    setCurrentPage(selectedPage);
    getCurrentPageJobs(selectedPage);
  };

  //handle current page change event of pagination
  const getCurrentPageJobs = async (pageNo) => {
    console.log(pageNo);
    const newUrl = `${apiPath}/search?page=${pageNo}`;
    const response = await axios.post(newUrl);
    try {
      if (response.data.resp === 1) {
        setJobs(response.data.jobs.data);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
    document
      .getElementById("job-count")
      .scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="search-page">
      <BannerSearch
        keyword={keyword}
        onChangeKeyword={onChangeKeyword}
        onBannerFormSubmit={filterJobs}
      />
      <div className="Container">
        <form action="" id="searchPageForm">
          <div className="row my-5 mx-0">
            <div className="col-lg-4">
              <Filter filterJobs={filterJobs} />
            </div>
            <div className="col-lg-8">
              <div className="search-results">
                {isLoading && <Loader />}

                {!isLoading && (
                  <div className="col-12 offset-lg-1 col-lg-11 px-0">
                    <div className="results-count-reset-wrapper mt-lg-0 mt-3 mb-5">
                      <div className="card">
                        <div className="card-body row p-3">
                          <div className="col-6">
                            <h3 className="h6" id="job-count">
                              {jobs_count} jobs found
                            </h3>
                          </div>
                          <div className="col-6 text-right reset-filter">
                            <a
                              href="#v"
                              className="text-secondary"
                              onClick={resetFilter}
                            >
                              <span className="icon-reset mr-1"></span>
                              Reset Filter
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {jobs_count > 0 && (
                      <div>
                        {jobs.map((job, index) => {
                          return <JobBoxLg key={index} job={job} />;
                        })}

                        <ReactPaginate
                          previousLabel={"<<"}
                          nextLabel={">>"}
                          breakLabel={"..."}
                          breakClassName={"break-me"}
                          pageCount={pageCount}
                          marginPagesDisplayed={2}
                          pageRangeDisplayed={5}
                          onPageChange={handlePageClick}
                          containerClassName={"pagination"}
                          activeClassName={"active"}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
});
