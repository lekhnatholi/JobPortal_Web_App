import React from "react";
import PropTypes from "prop-types";

class Modal extends React.Component {
  render() {
    // Render nothing if the "show" prop is false
    if (!this.props.show) {
      return null;
    }

    return (
      <div
        className="backdrop"
        style={{
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backgroundColor: "rgba(0,0,0,0.3)",
          padding: 50,
        }}
      >
        <div
          className="custom-modal"
          style={{
            backgroundColor: "#fff",
            borderRadius: 5,
            maxWidth: 800,
            minHeight: 400,
            margin: "0 auto",
            padding: 30,
            overflowY: "auto",
            maxHeight: "calc(100vh - 210px)"
          }}
          id={this.props.divId}
        >
          <div className="header text-right">
            <button onClick={this.props.onClose} className="btn btn-danger btn-md">x</button>
          </div>

          {this.props.children}
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node,
};

export default Modal;
