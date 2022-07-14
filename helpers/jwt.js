const jwt = require("jsonwebtoken");

const generarJWT = (uid, name) => {
  const payload = { uid, name };

  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        expiresIn: "48h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("error token");
        } else {
          resolve(token);
        }
      }
    );
  });
};
module.exports = {
  generarJWT,
};
