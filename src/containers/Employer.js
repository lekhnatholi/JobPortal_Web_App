import React, { Component } from "react";
import { Route, NavLink, Switch, withRouter } from "react-router-dom";
import { apiPath } from "../utils/Consts";
import PostNewJob from "./PostNewJob";
import ViewJobApplicant from "./ViewJobApplicants";
import ViewPostedJobs from "./ViewPostedJobs";
import EditEmployerProfile from "./EditEmployerProfile";
import EmployerLanding from "./EmployerLanding";
import ChangePassword from "./ChangePassword";

import axios from "axios";
import BannerEmployer from "./BannerEmployer";

class Employer extends Component {
  state = {
    total_applicants: 0,
    total_jobs_posted: 0,
    cover: "",
    logo: "",
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    axios
      .get(apiPath + "/employer")
      .then((response) => {
        if (response.data.resp === 1) {
          this.setState({
            ...response.data.result,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  changeLogoAndCover = (logo, cover) => {
    this.setState({
      logo,
      cover,
    });
  };

  render() {
    return (
      <div>
        <BannerEmployer cover={this.state.cover} logo={this.state.logo} />

        <section className="company-content-wrapper ">
          <div className="Container">
            <div className="row no-gutters justify-content-between">
              <div className="col-lg-3">
                <div className="profile-pic" id="profilePic">
                  <div className="jobseeker-nav-pill">
                    <NavLink to={`${this.props.match.url}`} exact>
                      Dashboard
                    </NavLink>
                  </div>
                  <div className="jobseeker-nav-pill">
                    <NavLink to={`${this.props.match.url}/edit-profile`}>
                      Edit profile
                    </NavLink>
                  </div>
                  <div className="jobseeker-nav-pill">
                    <NavLink to={`${this.props.match.url}/post-new-job`}>
                      Post a new job
                    </NavLink>
                  </div>
                  <div className="jobseeker-nav-pill">
                    <NavLink to={`${this.props.match.url}/view-posted-jobs`}>
                      View posted jobs
                    </NavLink>
                  </div>
                  <div className="jobseeker-nav-pill">
                    <NavLink to={`${this.props.match.url}/view-job-applicants`}>
                      View job applicants
                    </NavLink>
                  </div>
                </div>
              </div>
              <div className="col-lg-9">
                <Switch>
                  <Route path={`${this.props.match.path}`} exact>
                    <EmployerLanding
                      totalApplicants={this.state.total_applicants}
                      totalJobsPosted={this.state.total_jobs_posted}
                      fetchData={this.fetchData}
                    />
                  </Route>
                  <Route path={`${this.props.match.path}/edit-profile`}>
                    <EditEmployerProfile
                      changeLogoAndCover={this.changeLogoAndCover}
                    />
                  </Route>
                  <Route path={`${this.props.match.path}/post-new-job`}>
                    <PostNewJob />
                  </Route>
                  <Route path={`${this.props.match.path}/view-posted-jobs`}>
                    <ViewPostedJobs />
                  </Route>
                  <Route path={`${this.props.match.path}/view-job-applicants`}>
                    <ViewJobApplicant />
                  </Route>
                  <Route path={`${this.props.match.path}/change-password`}>
                    <ChangePassword />
                  </Route>
                </Switch>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default withRouter(Employer);
