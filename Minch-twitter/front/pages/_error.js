import React from "react";
import PropTypes from "prop-types";

const MyError = ({ statusCode }) => (
  <div>
    <h1>{statusCode} Error</h1>
  </div>
);

MyError.propTypes = {
  statusCode: PropTypes.number,
};

MyError.defaultProps = {
  statusCode: 400,
};

MyError.getInitialProps = async (context) => {
  const statusCode = context.res
    ? context.res.statusCode
    : context.err
    ? context.err.statusCode
    : null;
  return { statusCode };
};

export default MyError;
