const checkSchema = require('../../utils/Validation');

const password= {
  in: 'body',
  errorMessage: 'bananas',
  isLength: {
    options: {
      min: 6,
    },
    errorMessage: 'error.validation.password.short',
  }
}

const signupSchema = {
  password,
  username: {
    isLength: {
      options: {
        min: 3,
      },
      errorMessage: 'error.validation.username.short',
    }
  }
};

const loginSchema = {
  password: {
    exists: {
      errorMessage: 'error.validation.password.please-send-one'
    }
  },
  username: {
    exists: {
      errorMessage: 'error.validation.username.please-send-one'
    }
  }
};

const authorizationSchema = {
  Authorization: {
    in: 'headers',
  }
};

module.exports = {
  signup: checkSchema(signupSchema),
  login: checkSchema(loginSchema),
  authorization: checkSchema(authorizationSchema),
};
