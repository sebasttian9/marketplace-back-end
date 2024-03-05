import express from "express";
import {
    createUsers,
    getUser,
    login,
    loginGoogle
    } from "../../src/api/v1/controllers/usersControllers.js";

import { isLogin } from "../../src/api/v1/middlewares/validaToken.js";

// import { validateParametersUser } from '../../src/api/v1/middlewares/validaParamsUser.js';
// import { validparameters } from '../../src/api/v1/middlewares/validateParamsLogin.js';
const router = express.Router();

// Endpoint crear usuario
router.post("/usuarios", createUsers); // validateParametersUser
// Login Usuario normal
router.post("/login", login);
// Login Usuario Google
router.post('/google-auth', loginGoogle);
// router.get("/usuarios", isLogin, getUser);

export default router;