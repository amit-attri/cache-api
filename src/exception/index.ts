const Exception = {
  INVALID_PARAMS : (methodName, fieldName) => ({
    err_type: "invalid_params",
    err_message: `${methodName} has invalid param for ${fieldName}.`
  }),
  INVALID_KEY: () => ({
    err_type: "invalid_key",
    err_message: `Invalid Key`
  }),
  INVALID_VALUE: () => ({
    err_type: "invalid_value",
    err_message: `Invalid Value`
  })
}

export default Exception;