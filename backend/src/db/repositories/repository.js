import { SurveyModel } from "../../models/surveyModel.js";
import { UserModel } from "../../models/surveyModel.js";

// Crear una nueva encuesta
const createSurvey = async (data) => {
  const newSurvey = new SurveyModel({
    title: data.title,
    description: data.description,
  });

  return await newSurvey.save();
};

// Obtener todas las encuestas
const getAllSurveys = async () => {
  return await SurveyModel.find();
};

// Crear un nuevo usuario
const createUser = async (userData) => {
  const newUser = new UserModel(userData);
  return await newUser.save();
};

// Obtener usuario por correo
const getUserByEmail = async (email) => {
  return await UserModel.findOne({ email });
}

// Generar reporte por rango de fechas
const getReportByDate = async (startDate, endDate) => {
  return await SurveyModel.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      },
    },
    {
      $group: {
        _id: {
          date: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
        },
        totalSurveys: { $sum: 1 },
      },
    },
    { $sort: { "_id.date": 1 } },
  ]);
};

// Exportar funciones del repositorio
export default {
  createSurvey,
  getAllSurveys,
  createUser,
  getUserByEmail,
  getReportByDate,
};
