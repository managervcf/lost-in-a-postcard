import React from "react";
import withLoader from "../wrappers/withLoader";

const ErrorMessage = ({ text }) => <div className="error-message">{text}</div>;

export default withLoader(ErrorMessage);
