exports.paginaInicialGet = function (req, res) {
  res.render("index", {
    title: "Página Inicial",
    numeros: [1, 2, 3, 4, 5],
  });
  return;
};

exports.paginaInicialPost = (req, res) => {
  res.send(req.body);
  return;
};
