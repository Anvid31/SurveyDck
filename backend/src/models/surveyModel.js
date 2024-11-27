import mongoose from "mongoose";

// Schema para encuestas
const SurveySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true } // Habilita createdAt y updatedAt automáticamente
);

// Schema para usuarios
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true } // Habilita createdAt y updatedAt automáticamente
);

// Modelos
const SurveyModel = mongoose.model("Survey", SurveySchema);
const UserModel = mongoose.model("User", UserSchema);
export { SurveyModel, UserModel };
