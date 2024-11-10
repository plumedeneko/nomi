import mongoose from "mongoose";
import "../connection.js";
import jwt from "jsonwebtoken";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

const infoSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    age: { type: String },
    phoneNum: { type: String },
    emerContactNum: { type: String },
    email: { type: String },
    address: { type: String },
    bloodType: { type: String },
    allergies: { type: String },
    dietaryRestrictions: {type: String },
    vaccinations: { type: String },
    medications: { type: String },
    physicalDisabilities: { type: String },
    mentalDisorders: { type: String },
    dnrStatus: { type: String }
});

const presetSchema = new mongoose.Schema({
    username: { type: String, required: true},
    presetID: { type: String, required: true},
    qrCode: { type: String },
    firstName: { type: Boolean, default: true },
    lastName: { type: Boolean, default: true },
    age: { type: Boolean, default: false },
    phoneNum: { type: Boolean, default: false },
    emerContactNum: { type: Boolean, default: true },
    email: { type: Boolean, default: false },
    address: { type: Boolean, default: false },
    bloodType: { type: Boolean, default: true },
    allergies: { type: Boolean, default: false },
    dietaryRestrictions: {type: Boolean, default: false },
    vaccinations: { type: Boolean, default: false },
    medications: { type: Boolean, default: false },
    physicalDisabilities: { type: Boolean, default: false },
    mentalDisorders: { type: Boolean, default: false },
    dnrStatus: { type: Boolean, default: false }
});

presetSchema.index({ username: 1, presetID: 1, qrCode: 1}, {unique: true});

const loginSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

loginSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id:this._id}, process.env.JWTPRIVATEKEY, {expiresIn: "7d", algorithm: "HS256"})
    return token;
}

export const UserInfo = mongoose.model('users', infoSchema);
export const Preset = mongoose.model('presets', presetSchema);
export const Login = mongoose.model('logins', loginSchema);

export const validatePass = (data) => {
    const schema = Joi.object({
        username: Joi.string().required().label("username"),
        password: passwordComplexity().required().label("password")
    });
    return schema.validate(data);
}