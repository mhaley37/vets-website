import React from 'react';

const RatedDisabilitiesSidebar = () => (
  <div className="medium-screen:vads-u-padding-left--4">
    <h3 className="vads-u-padding-bottom--1p5 vads-u-border-bottom--3px vads-u-border-color--primary">
      How did I get this rating?
    </h3>
    <p>
      Your total disability rating is based on evidence you provide, the results
      of your VA claim exam, and information from other sources.
    </p>
    <a
      href="https://www.youtube.com/watch?v=oM7oYzL2DCg"
      aria-label="view information on how you recieved the rating you did on YouTube"
      target="_blank"
      rel="noopener noreferrer"
      title="view information on how you recieved the rating you did on YouTube"
    >
      Compensation 101: How did I get this rating (YouTube)
    </a>
    <h3 className="vads-u-padding-bottom--1p5 vads-u-border-bottom--3px vads-u-border-color--primary">
      Learn about VA disability ratings
    </h3>
    <p>
      To see how your combined VA disability rating was determined, use our
      disability rating calculator and ratings tables.
    </p>
    <a
      href="/disability/about-disability-ratings/"
      aria-label="About VA disability ratings"
      title="About VA disability ratings"
    >
      About VA disability ratings
    </a>
    <h3 className="vads-u-padding-bottom--1p5 vads-u-border-bottom--3px vads-u-border-color--primary">
      What if I have questions?
    </h3>
    <p>
      You can call us at
      <a
        className="vads-u-margin-left--0p5"
        aria-label="Dial the telephone number 800-827-1000"
        href="tel:800-827-1000"
        title="Dial the telephone number 800-827-1000"
      >
        800-827-1000
      </a>
      . We're here Monday through Friday, 8:00 a.m. to 9:00 p.m. ET.
    </p>
  </div>
);

export default RatedDisabilitiesSidebar;
