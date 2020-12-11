import React, { Component } from "react";
import { matchPath, withRouter } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import BannerEmployer from "./BannerEmployer";
import Loader from "./Loader";
import { apiPath } from "../utils/Consts";

class JobPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      job: {},
      employer: {
        name: "ABC employer",
        address: "Thamel, Kathmandu",
        phone: "+977-9860536208",
        email: "xyz@abcemployer.com",
      },
      isLoading: true,
    };
  }

  static contextType = AuthContext;

  componentDidMount() {
    const getParams = (pathname) => {
      const matchJobPath = matchPath(pathname, {
        path: `/job/:slug`,
      });
      return (matchJobPath && matchJobPath.params) || {};
    };

    const { pathname } = this.props.location;
    const currentParams = getParams(pathname);
    console.log(currentParams);

    if (this.state.isLoading) {
      axios
        .get(`${apiPath}/job/${currentParams.slug}`)
        .then((response) => {
          if (response.data.resp === 1) {
            console.log(response);
            this.setState({
              job: response.data.job,
              employer: response.data.job.employer,
              isLoading: false,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  applyForJob = () => {
    const { auth } = this.context;
    console.log(auth.entity);
    const isAuthenticated = auth.email ? true : false;

    if (!isAuthenticated) {
      alert("you must login to apply for jobs");
    } else {
      const apiPath = process.env.REACT_APP_API_URL;

      axios
        .post(apiPath + "/apply-for-job", {
          job_id: this.state.job.id,
        })
        .then((response) => {
          if (response.data.resp === 1) {
            //show success message
            alert("Successfuly applied for job");
          } else if (response.data.resp === 0) {
            alert(response.data.message);
          } else {
            alert("Request Failed");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  render() {
    const { employer, job } = this.state;
    const { auth } = this.context;
    return (
      <div>
        {this.state.isLoading && <Loader />}

        {!this.state.isLoading && (
          <div>
            <BannerEmployer cover={employer.cover} logo={employer.logo} />
            <div className="row justify-content-around job-page-wrapper mb-5 mx-0">
              <div className="col-lg-3">
                <div className="employer-detail-box">
                  <h5 className="mb-3 mr-5">Company Details</h5>
                  <ul>
                    <li>
                      Name: <span>{employer.address}</span>
                    </li>
                    <li>
                      Address: <span>{employer.address}</span>
                    </li>
                    <li>
                      Email: <span>{employer.email}</span>
                    </li>
                    <li>
                      Phone: <span>{employer.phone}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-8">
                <div className="job-info-container">
                  <h5>Basic Job Information</h5>
                  <ul>
                    <li>
                      Title: <span>{job.title}</span>
                    </li>
                    <li>
                      Category: <span>{job.category}</span>
                    </li>
                    <li>
                      Level: <span>{job.level}</span>
                    </li>
                    <li>
                      Type: <span>{job.type}</span>
                    </li>
                    <li>
                      Qualificaiton: <span>{job.qualification}</span>
                    </li>
                    <li>
                      Experience: <span>{job.experience}</span>
                    </li>
                    <li>
                      Salary: <span>{job.salary}</span>
                    </li>
                    <li>
                      Deadline: <span>{job.deadline}</span>
                    </li>
                  </ul>
                </div>
                <div className="job-description-container">
                  <h5 className="mb-3">Job Description :</h5>
                  <div
                    dangerouslySetInnerHTML={{ __html: job.description }}
                  ></div>
                </div>
                <div className="job-apply-btn">
                  {!(auth.entity === "employer") && (
                    <button
                      type="submit"
                      className="post-job-btn b-0 px-3 primary"
                      onClick={this.applyForJob}
                    >
                      Apply for Job
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(JobPage);
