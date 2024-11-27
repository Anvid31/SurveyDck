import repository from "../db/repositories/repository.js";


// Crear encuesta
const createSurvey = async (data) => {
  try {
    if (!data.title || !data.description) {
      throw new Error("Title and Description are required.");
    }

    const newSurvey = await repository.createSurvey(data);
    return newSurvey;
  } catch (error) {
    console.error("Error al crear la encuesta:", error);
    throw new Error("No se pudo crear la encuesta.");
  }
};

// Obtener todas las encuestas
const readSurvey = async () => {
  try {
    const surveys = await repository.getAllSurveys();
    return surveys;
  } catch (error) {
    console.error("Error al obtener las encuestas:", error);
    throw new Error("No se pudieron obtener las encuestas.");
  }
};

// Registrar usuario
const registerUser = async (userData) => {
  try {
    const { email } = userData;

    // Verificar si el usuario ya existe
    const existingUser = await repository.getUserByEmail(email);
    if (existingUser) {
      throw new Error("El usuario ya existe.");
    }

    // Crear usuario
    const newUser = await repository.createUser(userData);
    return { message: "Usuario registrado exitosamente.", user: newUser };
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    throw new Error("No se pudo registrar el usuario.");
  }
};

// Inicio de sesión
const loginUser = async (email, password) => {
  try {
    // Buscar usuario por correo
    const user = await repository.getUserByEmail(email);
    if (!user) {
      throw new Error("El usuario no existe.");
    }

    // Comparar contraseñas
    if (user.password !== password) {
      throw new Error("Contraseña incorrecta.");
    }

    return { message: "Inicio de sesión exitoso.", user };
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw new Error("No se pudo iniciar sesión.");
  }
};

// Generar reporte por rango de fechas
const getReportService = async ({ startDate, endDate }) => {
  try {
    if (!startDate || !endDate) {
      throw new Error("StartDate and EndDate are required.");
    }

    const report = await repository.getReportByDate(startDate, endDate);
    return report;
  } catch (error) {
    console.error("Error al generar el reporte:", error);
    throw new Error("No se pudo generar el reporte.");
  }
};

export default {
  createSurvey,
  readSurvey,
  registerUser,
  loginUser,
  getReportService
};
