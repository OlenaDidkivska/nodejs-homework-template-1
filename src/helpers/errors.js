class NodejsHomeworkError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class UpdateStatusError extends NodejsHomeworkError {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

class ValidationError extends NodejsHomeworkError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class Conflict extends NodejsHomeworkError {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}

class Unauthorized extends NodejsHomeworkError {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

module.exports = {
  NodejsHomeworkError,
  UpdateStatusError,
  ValidationError,
  Conflict,
  Unauthorized,
};
