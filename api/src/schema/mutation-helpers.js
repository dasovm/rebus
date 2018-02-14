const missingFieldError = field => ({
  field,
  message: `Required field '${field}' is missing.`,
});

const missingOneOfFieldsError = (field, fields) => ({
  field,
  message: `One of the fields '${fields.join(', ')}' must be provided.`,
});

const ensureValidationSuccess = ({ input, output }) => {
  if (output.errors.length > 0) {
    throw {
      type: 'validation',
      error: output.errors,
    };
  } else {
    return { input, output };
  }
};

const ensureFieldsExist = fields => ({ input, output }) => {
  for (const field of fields) {
    if (!(field in input.args)) {
      output.errors.push(missingFieldError(field));
    }
  }
  return { input, output };
};

const ensureAtleastOneOfFieldsExist = fields => ({ input, output }) => {
  let exist = false;
  for (const field of fields) {
    if (field in input.args) {
      exist = true;
      break;
    }
  }

  if (!exist) {
    for (const field of fields) {
      output.errors.push(missingOneOfFieldsError(field, fields));
    }
  }

  return { input, output };
};

const finalize = ({ output: { errors, ...output } }) => ({
  ...output,
  validationErrors: errors,
});

const aggregateErrors = err => {
  console.log(err);
  if (err instanceof Error) {
    throw err;
  }
  const { type, error } = err;
  if (type === 'error') {
    throw error;
  } else if (type === 'validation') {
    return {
      validationErrors: error,
    };
  }
  return {};
};

module.exports = {
  ensureValidationSuccess,
  ensureFieldsExist,
  ensureAtleastOneOfFieldsExist,
  finalize,
  aggregateErrors,
};
