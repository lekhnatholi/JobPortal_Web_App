import * as React from "react";
import CompnayLogo from "../images/company-logo.png";
import { Link } from "react-router-dom";

export default ({ job, classValue }) => {
  return (
    <div className={classValue}>
      <div className="job-box">
        <div className="job-box-body">
          <div className="row text-lg-center">
            <div className="col-lg-3 ">
              <div className="job-logo m-auto">
                <img src={CompnayLogo} alt="Company Logo" />
              </div>
            </div>
            <div className="col-lg-9">
              <div className="job-info text-center text-lg-left clearfix">
                <h4 className="text-uppercase">
                  <Link to={`/job/${job.slug}`} className="job-title">
                    {job.title}
                  </Link>
                </h4>
                <h6>{job.employer.name}</h6>
                <ul>
                  <li>
                    <span className="icon-cash mr-3"></span>
                    {job.salary}
                  </li>
                  <li>
                    <span className="icon-address mr-3"></span>
                    {job.employer.address}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="job-box-footer text-center text-lg-right mt-1">
          <small>
            <span className="deadline-title">Deadline</span> :{job.deadline}
          </small>
        </div>
      </div>
    </div>
  );
};
