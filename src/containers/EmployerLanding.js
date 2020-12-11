import React, { useEffect } from "react";

export default ({totalJobsPosted, totalApplicants, fetchData}) => {

  useEffect(()=> {
    fetchData();
  }, []);

  return (
    <div>
      <div className="row mt-4 mx-0">
        {totalJobsPosted !== "" && (
          <div className="col-lg-6">
            <div className="card-counter success">
              <i className="fa fa-database"></i>
              <span className="count-numbers">{totalJobsPosted}</span>
              <span className="count-name">Total Jobs Posted</span>
            </div>
          </div>
        )}
        {totalApplicants !== "" && (
          <div className="col-lg-6">
            <div className="card-counter info">
              <i className="fa fa-users"></i>
              <span className="count-numbers">{totalApplicants}</span>
              <span className="count-name">Total Applicants</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
