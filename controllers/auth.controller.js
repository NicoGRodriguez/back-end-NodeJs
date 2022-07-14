//con response le agrego tipado  a res
const { response } = require("express");
const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");
//CREAR USUARIO
const crearUsuario = async (req, res = response) => {
  const { email, name, password } = req.body;
  // console.log(email, password);
  try {
    //Verificar el email
    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(404).json({
        ok: false,
        msg: "El usuario ya exite con ese email",
      });
    }
    //Crear usuario con el modelo
    usuario = new Usuario(req.body);
    //Hashear la pass
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);
    //Generar el JWT
    const token = await generarJWT(usuario.uid, name);
    //Crear usuario de base de datos
    await usuario.save();
    //Generar respuesta exitosa
    return res.status(201).json({
      ok: true,
      uid: usuario.id,
      name,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Algo salio mal",
    });
  }
};
//LOGIN USER
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    //Verifico Email
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(404).json({
        ok: false,
        msg: "Credenciales invalidas",
      });
    }
    //Confirmar si el password hace mach
    const validPassword = bcrypt.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(404).json({
        ok: false,
        msg: "Credenciales invalidas",
      });
    }
    //Generar JWT
    const token = await generarJWT(usuario.uid, usuario.name);
    //Generar respuesta exitosa
    return res.status(200).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Algo salio mal",
    });
  }
};
//CONSUMIR EL JWT
const renew = async (req, res) => {
  const { uid, name } = req;
  //genero nuevo token
  const token = await generarJWT(uid, name);
  return res.status(200).json({
    ok: true,
    uid,
    name,
    token,
  });
};
//EXPORTAR
module.exports = {
  crearUsuario,
  login,
  renew,
};
