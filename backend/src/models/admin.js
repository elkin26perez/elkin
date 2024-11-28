import mongoose from 'mongoose';

const AdministradorSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 100 },
  email: { type: String, required: true, unique: true, maxlength: 100 },
  password: { type: String, required: true, maxlength: 100 },
  rol: { type: String, required: true, maxlength: 100 },
});

export default mongoose.model('Administrador', AdministradorSchema);
