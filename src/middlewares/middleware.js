exports.middlewareGlobal = (req, res, next) => {
  res.locals.umaVariavelLocal = "Uma variavel local";
  next();
};

exports.checkCsrfError = (err, req, res, next) => {
  if (err) {
    return res.render("404");
  }
  next();
};

exports.csrfMiddlware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};
