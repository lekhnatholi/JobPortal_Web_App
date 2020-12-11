import React from 'react'
import CompanyCover from "../images/cover.jpg";
import CompnayLogo from "../images/company-logo.png";

export default ({cover, logo}) => {
    return (
      <section
        className="company-cover"
        style={{
          backgroundImage: `url(${
            cover ? cover : CompanyCover
          })`,
        }}
      >
        <div className="company-logo-wrap">
          <img
            src={logo ? logo : CompnayLogo}
            alt="company logo"
          />
        </div>
      </section>
    );
}