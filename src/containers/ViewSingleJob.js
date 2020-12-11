import React, { Component } from "react";
import Modal from "../widgets/Modal";

class SingleJob extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false ,
    };
  }

  toggleModal = (e) => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    const job = this.props.job;
    return (
      <React.Fragment>
        <button
          className="btn btn-info btn-xs"
          onClick={this.toggleModal}
          data-target={this.props.divId}
        >
          <i
            className="fas fa-eye text-white"
            data-toggle="tooltip"
            title="View Job"
          ></i>
        </button>

        <Modal
          show={this.state.isOpen}
          onClose={this.toggleModal}
          divId={this.props.divId}
        >
          <div className="view-singlejob">
            <div className="row mx-0">
              <div className="col-lg-6">
                <div className="form-group row">
                  <label className="col-lg-4 col-form-label">Job Title :</label>
                  <div className="col-lg-8 pt-2">{job.title}</div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group row">
                  <label className="col-lg-4 col-form-label">Category :</label>
                  <div className="col-lg-8 pt-2"> {job.category}</div>
                </div>
              </div>
            </div>

            <div className="row mx-0">
              <div className="col-lg-6">
                <div className="form-group row">
                  <label className="col-lg-4 col-form-label">Job Type :</label>
                  <div className="col-lg-8 pt-2">{job.type}</div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group row">
                  <label className="col-lg-4 col-form-label">Job Level :</label>
                  <div className="col-lg-8 pt-2">{job.level}</div>
                </div>
              </div>
            </div>

            <div className="row mx-0">
              <div className="col-lg-6">
                <div className="form-group row">
                  <label className="col-lg-4 col-form-label">
                    Experience :
                  </label>
                  <div className="col-lg-8 pt-2">{job.experience}</div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group row">
                  <label className="col-lg-4 col-form-label">
                    Qualification:
                  </label>
                  <div className="col-lg-8 pt-2">{job.qualification}</div>
                </div>
              </div>
            </div>

            <div className="row mx-0">
              <div className="col-lg-6">
                <div className="form-group row">
                  <label className="col-lg-4 col-form-label">
                    Salary :
                  </label>
                  <div className="col-lg-8 pt-2">{job.salary}</div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group row">
                  <label className="col-lg-4 col-form-label">
                    Expiry date :
                  </label>
                  <div className="col-lg-8 pt-2">{job.expiry_date}</div>
                </div>
              </div>
            </div>

            <div className="form-group row mx-0">
              <label className="col-lg-4 col-form-label">
                Job Description :
              </label>
              <div
                className="offset-lg-2 col-lg-10"
                dangerouslySetInnerHTML={{ __html: job.description }}
              ></div>
            </div>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}

export default SingleJob;
