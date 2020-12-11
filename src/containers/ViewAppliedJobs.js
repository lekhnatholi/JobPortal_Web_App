import React, { Component } from "react";
import SingleJob from "./ViewSingleJob";

class ViewAppliedJobs extends Component {
  render() {
    return (
      <div
        className="job-applied-wrapper table-responsive-md"
        id="view-job-posted"
      >
        <table className="table table-striped">
          <thead>
            <tr>
              <th>S.N</th>
              <th>Job Title</th>
              <th>Category</th>
              <th>Expiry Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.props.jobs.length ? (
              this.props.jobs.map((item, index) => {
                return (
                  <tr key={index++}>
                    <th>{index}</th>
                    <td>{item.title}</td>
                    <td>{item.category}</td>
                    <td>{item.expiry_date}</td>
                    <td>
                      <SingleJob divId={`singlejob${index}`} job={item} />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5">No applied jobs yet</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ViewAppliedJobs;
