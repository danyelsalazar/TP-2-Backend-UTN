import mongoose, { Schema } from "mongoose";
import { TYPES } from "../constants/typePublication.js";

const publicationSchema = new Schema(
  {
    descripcion: {
      type: String,
      required: [true, "Se debe enviar una descripcion en la publicacion"],
    },
    materia: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
    publicador: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: [true, "Es requerido el publicador"],
    },
    likers: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [],
    },
    tipo: {
      type: String,
      enum: Object.values(TYPES),
      required: [true, "Es requerido el tipo de publicacion"],
    },
  },
  { timestamps: true },
);

//creamos el modelo para luego exportarlo
const Publication = mongoose.model("Publication", publicationSchema);

export { Publication };
