import React, { Component } from "react";


const ProgressHk = (props) => {
	return (
      <div className="ProgressBar">
        <div
          className="Progress"
          style={{ width: props.progress + "%" }}
        />
      </div>
    );
};

export default ProgressHk;