import mongoose from "mongoose";
import "../connection.js";

const infoSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    name: { type: String },
    age: { type: Number },
    email: { type: String },
    bloodType: { type: String },
    allergies: { type: String },
    vaccinations: { type: String },
});

const loginSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

export const UserInfo = mongoose.model('users', infoSchema);
export const Login = mongoose.model('logins', loginSchema);
