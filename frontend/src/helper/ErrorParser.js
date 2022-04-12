export const responseTracer = (response) => {
  const error = {};
  if (response.status === 400) {
    error.message = "bad_request";
    error.location = getErrorLocation(response.data.errors);
  } else if (response.status === 401) {
    error.message = "unauthorized";
    error.location = getErrorLocation(response.data.errors);
  } else if (response.status === 404) {
    error.message = "path_or_field_not_found";
    error.location = getErrorLocation(response.data.errors);
  } else if (response.status === 409) {
    error.message = "data_conflict";
    error.location = getErrorLocation(response.data.errors);
  } else if (response.status === 413) {
    error.message = "data_too_large";
    error.location = getErrorLocation(response.data.errors);
  } else if (response.status === 419) {
    error.message = response.data.message;
    error.error_data = response.data.errorData;
  } else if (response.status === 422) {
    error.message = "verification_invalid";
    error.location = getErrorLocation(response.data.errors);
    error.cartErrors = response.data;
  } else if (response.status === 451) {
    error.message = "unavailable_for_legal_reasons";
    error.location = getErrorLocation(response.data.errors);
    error.cartErrors = response.data;
  } else if (response.status === 500) {
    error.message = "server_error";
    error.location = getErrorLocation(response.data.errors);
  } else if (response.status === 504) {
    error.message = "proxy_connection_error";
    error.location = getErrorLocation(response.data.errors);
  }
  return error;
};
export const requestTracer = (error) => {
  return error;
};

export const errorTracer = (error) => {
  return error?.message ?? error;
};

export const errorParser = (error) => {
  let errorResponse;
  if (error.response) {
    // The request was made and the server responded with a status code
    errorResponse = responseTracer(error.response);
  } else if (error.request) {
    // The request was made but no response was received
    errorResponse = requestTracer(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    errorResponse = errorTracer(error.response);
  }
  return errorResponse;
};

export const getErrorLocation = (errors) => {
  let errorString = "Errors located at: ";
  if (errors) {
    Object.keys(errors).forEach((key) => {
      if (errors[key] && errors[key].param) {
        errorString = `${errorString} ${errors[key].param}, `;
      }
    });
  } else {
    errorString = "No params to display";
  }
  return errorString;
};
