exports.middlewareGlobal = (req, res, next) => {
  res.locals.umaVariavelLocal = "Uma variavel local";
  next();
};

exports.checkCsrfError = (err, req, res, next) => {
  if (err && "EBADCSRFTOKEN" === err.code) {
    return res.render("404");
  }
};

exports.csrfMiddlware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};
