// @flow

import ExtendableError from 'es6-error';

class SubmissionError extends ExtendableError {
  errors: *;

  constructor(errors: mixed) {
    super('Submit Validation Failed');
    this.errors = errors;
  }
}

export default SubmissionError;
