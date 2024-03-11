import express from "express";
import {
  createUsers,
  getUser,
  login,
  loginGoogle,
} from "../../src/api/v1/controllers/usersControllers.js";
import { validateLogin } from "../../src/api/v1/validators/loginValidator.js";
import { validateLoginGoogle } from "../../src/api/v1/validators/loginGoogleValidator.js";
import { validateUser } from "../../src/api/v1/validators/userValidator.js";

const router = express.Router();

// Endpoint crear usuario
router.post("/usuarios", validateUser, createUsers);
// Login Usuario normal
router.post("/login", validateLogin, login);
// Login Usuario Google
router.post("/google-auth", validateLoginGoogle, loginGoogle);
// router.get("/usuarios", isLogin, getUser);

export default router;
