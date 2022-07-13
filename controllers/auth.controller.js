//con response le agrego tipado  a res
const { response } = require("express");

const crearUsuario = (req, res = response) => {
  // const { email, password } = req.body;
  // console.log(email, password);
  return res.status(200).json({
    ok: true,
    msg: "Crear Usuario /register",
  });
};
const login = (req, res) => {
  return res.status(200).json({
    ok: true,
    msg: "Login de usuario /",
  });
};
const renew = (req, res) => {
  return res.status(200).json({
    ok: true,
    msg: "renew de usuario /renew",
  });
};

module.exports = {
  crearUsuario,
  login,
  renew,
};
