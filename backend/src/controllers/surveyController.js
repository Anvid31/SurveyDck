import { Router } from "express";
import answers from "../utils/answers.js";
import surveyService from "../services/surveyService.js";

const router = Router();

// Obtener todas las encuestas
router.get("/", (req, res) => {
  surveyService
    .readSurvey()
    .then((data) => {
      answers.exito(req, res, data, 200); // Código 200 para éxito al obtener datos
    })
    .catch((err) => {
      console.error("Error al obtener las encuestas:", err);
      answers.error(req, res, err, "Error al obtener las encuestas", 400);
    });
});

// Crear una nueva encuesta
router.post("/create", (req, res) => {
  surveyService
    .createSurvey(req.body)
    .then((data) => {
      answers.exito(req, res, "Se ha creado la encuesta", 201); // Código 201 para creación exitosa
    })
    .catch((err) => {
      console.error("Error al crear la encuesta:", err);
      answers.error(req, res, err, "Error al crear la encuesta", 400);
    });
});

router.post("/register", (req, res) => {
  surveyService
    .registerUser(req.body)
    .then((result) => {
      answers.exito(req, res, result, 201);
    })
    .catch((err) => {
      answers.error(req, res, err, "Error al registrar el usuario", 400);
    });
});

// Inicio de sesión
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  surveyService
    .loginUser(email, password)
    .then((result) => {
      answers.exito(req, res, result, 200);
    })
    .catch((err) => {
      answers.error(req, res, err, "Error al iniciar sesión", 400);
    });
});

// Generar reporte por rango de fechas
router.get("/report", (req, res) => {
  const { startDate, endDate } = req.query;

  // Validar parámetros
  if (!startDate || !endDate) {
    return answers.error(
      req,
      res,
      null,
      "Los parámetros startDate y endDate son requeridos",
      400
    );
  }

  surveyService
    .getReportService({ startDate, endDate })
    .then((report) => {
      answers.exito(req, res, report, 200); // Código 200 para éxito al obtener datos
    })
    .catch((err) => {
      console.error("Error al generar el reporte:", err);
      answers.error(req, res, err, "Error al generar el reporte", 400);
    });
});

export default router;
