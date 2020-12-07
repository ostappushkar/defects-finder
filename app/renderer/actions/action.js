const action = (type, data = null, error = null) => {
  return {
    type: type,
    payload: { data: data, error: error },
  };
};
export default action;