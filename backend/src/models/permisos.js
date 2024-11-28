import mongoose from 'mongoose';

const PermisoSchema = new mongoose.Schema({
  tipotrabajo: { type: String, required: true, maxlength: 100 },
  duraciontrabajo: { type: Number, required: true },
  riesgotrabajo: { type: String, required: true, maxlength: 100 },
  file: { type: String }, 
  urgencia: { type: String, required: true, maxlength: 100 },
  estatus: { type: String, required: true, maxlength: 100 },
  fecha_creacion: { type: Date, default: Date.now },
});

export default mongoose.model('Permiso', PermisoSchema);
