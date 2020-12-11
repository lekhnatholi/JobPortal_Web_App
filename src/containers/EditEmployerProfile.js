import React, { Component } from "react";
import Editor from "../widgets/Editor";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { printError, removeError } from "../utils/Helpers";
import { apiPath } from "../utils/Consts";

class EditCompanyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      address: "",
      description: "",
      logo: "",
      cover: "",
      logo_label: "Upload Logo",
      cover_label: "Upload Cover",
    };
  }

  static contextType = AuthContext;

  componentDidMount() {

    axios
      .get(apiPath + "/employer/edit-profile")
      .then((response) => {
        if (response.data.resp === 1) {
          this.setState({
            ...response.data.user,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const apiPath = process.env.REACT_APP_API_URL;
    removeError();

    let formData = new FormData(document.getElementById("edit-company"));
    formData.append("description", this.state.description);
    console.log(formData);

    axios
      .post(apiPath + "/employer/edit-profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.data.resp === 1) {
          //show success message
          alert("Successfuly edited profile");

          //uodate context values
          const { setAuthStatus } = this.context;
          const { email, entity, token } = response.data.user;
          setAuthStatus({ email, entity, token });

          //update logo and cover
          const { logo, cover } = response.data.user;
          this.props.changeLogoAndCover(logo, cover);

          //reset placeholder of logo and cover
          this.setState({
            logo_label: "Upload Logo",
            cover_label: "Upload Cover",
          });
        } else {
          //show failure message
          alert("Request Failed");
        }
      })
      .catch((error) => {
        //show erros message
        console.log(error);
        if (error.response && error.response.status === 422) {
          alert("Please correct highlighted erros");
          printError(error.response.data);
        }
      });
  };

  changeLogoLabel = (e) => {
    console.log(e);
    if (e.target.files.length > 0) {
      this.setState({
        logo_label: e.target.files[0].name,
      });
    } else {
      this.setState({
        logo_label: "Upload Logo",
      });
    }
  };

  changeCoverLabel = (e) => {
    if (e.target.files.length > 0) {
      this.setState({
        cover_label: e.target.files[0].name,
      });
    } else {
      this.setState({
        cover_label: "Upload Cover",
      });
    }
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "logo") {
      this.changeLogoLabel(e);
    }

    if (e.target.name === "cover") {
      this.changeCoverLabel(e);
    }

    const errMsg = e.target.nextSibling || null;
    if (errMsg && errMsg.classList.contains("is-invalid")) {
      errMsg.remove();
    }
  };

  updateDescription = (value) => {
    this.setState({ description: value });
  };

  render() {
    return (
      <div
        className="job-applied-wrapper table-responsive-md"
        id="edit-company-profile"
      >
        <form
          onSubmit={this.handleSubmit}
          encType="multipart/form-data"
          id="edit-company"
        >
          <div className="form-group my-30">
            <input
              type="text"
              placeholder="Company Name"
              className="form-control p-3"
              name="name"
              value={this.state.name || ""}
              onChange={this.onChange}
            />
          </div>

          <div className="form-group my-30">
            <input
              type="text"
              placeholder="Address"
              className="form-control  p-3"
              name="address"
              value={this.state.address || ""}
              onChange={this.onChange}
            />
          </div>

          <div className="form-group my-30">
            <Editor
              placeholder="Write about your company ....."
              handleChange={this.updateDescription || ""}
              editorHtml={this.state.description}
            />
          </div>

          <div className="form-group my-30">
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                name="logo"
                onChange={this.onChange}
              />
              <label className="custom-file-label" htmlFor="customFile">
                {this.state.logo_label}
              </label>
            </div>
          </div>

          <div className="form-group my-30">
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                name="cover"
                onChange={this.onChange}
              />
              <label className="custom-file-label" htmlFor="customFile">
                {this.state.cover_label}
              </label>
            </div>
          </div>

          <div className="form-submit mt-30 mb-3">
            <button
              type="submit"
              className="post-job-btn b-0 px-3 primary"
            >
              Edit profile
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default EditCompanyProfile;
