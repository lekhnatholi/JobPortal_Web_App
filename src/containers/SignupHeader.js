import React from "react";
export default function ({ isUserEntityJobseeker, setUserEntity, action }) {
  return (
    <div className="form-top text-center">
      <h4>
        I am{" "}
        <span className="highlight">
          {isUserEntityJobseeker ? "Jobseeker" : "Employer"}
        </span>
      </h4>

      <div className="entity-select d-flex mt-4">
        <div
          className={`seeker login-as mb-lg-0 mb-2 ${
            isUserEntityJobseeker ? "active" : ""
          } `}
          onClick={(e) => setUserEntity("jobseeker")}
        >
          {action} as Jobseeker
        </div>
        <div
          className={`employer login-as ${
            !isUserEntityJobseeker ? "active" : ""
          } `}
          onClick={(e) => setUserEntity("employer")}
        >
          {action} as Employer
        </div>
      </div>
    </div>
  );
}
