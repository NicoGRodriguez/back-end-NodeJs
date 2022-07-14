//Desestruturo Router
const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearUsuario,
  login,
  renew,
} = require("../controllers/auth.controller");
const { validarCampo } = require("../middlewares/validar-campo");
const { validarJWT } = require("../middlewares/validar-jwt");
//La inicializo en router, para conigurar
const router = Router();
//coolback === controlador
//Crear un nuevo Usuario
router.post(
  "/register",
  [
    check("name", "El Name es obligatorio")
      .not()
      .isEmpty()
      .isLength({ min: 3 }),
    check("email", "El Email es obligatorio").isEmail(),
    check("password", "El Password es obligatorio").isLength({ min: 6 }),
    validarCampo,
  ],
  crearUsuario
);
//Iniciar Sesion
router.post(
  "/",
  [
    check("email", "El Email es obligatorio").isEmail(),
    check("password", "El Password es obligatorio").isLength({ min: 6 }),
    validarCampo,
  ],
  login
);
//Validar Token
router.get("/renew", validarJWT, renew);

//exporto las rutas
module.exports = router;
