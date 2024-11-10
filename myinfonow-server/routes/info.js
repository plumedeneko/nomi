import express from 'express';
import { UserInfo, Preset, Login } from './models.js';
import QRCode from 'qrcode';

const infoRouter = express.Router();

infoRouter.post('/add-info', async (req, res) => {
    try {
        const {
            username, 
            firstName = "", 
            lastName = "", 
            age = "", 
            phoneNum = "", 
            emerContactNum = "", 
            email = "",
            address = "", 
            bloodType = "", 
            allergies = "",
            dietaryRestrictions = "",
            vaccinations = "", 
            medications = "",
            physicalDisabilities = "", 
            mentalDisorders = "", 
            dnrStatus = ""
        } = req.body;

        if (!username) {
            return res.status(400).json({ message: 'Username is required' });
        }

        const newUserInfo = new UserInfo({
            username,
            firstName,
            lastName,
            age,
            phoneNum,
            emerContactNum,
            email,
            address,
            bloodType,
            allergies,
            dietaryRestrictions,
            vaccinations,
            medications,
            physicalDisabilities,
            mentalDisorders,
            dnrStatus
        });

        await newUserInfo.save();

        res.status(201).json({ message: 'Information added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error adding information', error: err.message });
    }
});

infoRouter.put('/update-info', async (req, res) => {
    try {
        const {
            username,
            firstName,
            lastName,
            age,
            phoneNum,
            emerContactNum,
            email,
            address,
            bloodType,
            allergies,
            dietaryRestrictions,
            vaccinations,
            medications,
            physicalDisabilities,
            mentalDisorders,
            dnrStatus
        } = req.body;

        if (!username) {
            return res.status(400).json({ message: 'Username is required' });
        }

        const updatedUserInfo = await UserInfo.findOneAndUpdate(
            { username },
            {
                firstName,
                lastName,
                age,
                phoneNum,
                emerContactNum,
                email,
                address,
                bloodType,
                allergies,
                dietaryRestrictions,
                vaccinations,
                medications,
                physicalDisabilities,
                mentalDisorders,
                dnrStatus
            },
            { new: true }
        );

        if (!updatedUserInfo) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User information updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating user information', error: err.message });
    }
});

infoRouter.post('/add-preset', async (req, res) => {
    try {
        const {
            username, 
            presetID,
            firstName, 
            lastName, 
            age, 
            phoneNum, 
            emerContactNum, 
            email,
            address, 
            bloodType, 
            allergies,
            dietaryRestrictions, 
            vaccinations, 
            medications,
            physicalDisabilities, 
            mentalDisorders, 
            dnrStatus
        } = req.body;

        if (!username) {
            return res.status(400).json({ message: 'Username is required' });
        }
        
        if (!presetID) {
            return res.status(400).json({ message: 'PresetID is required' });
        }

        const qrCode = await generate_qr(username, presetID);

        const newPreset = new Preset({
            username,
            presetID,
            qrCode,
            firstName,
            lastName,
            age,
            phoneNum,
            emerContactNum,
            email,
            address,
            bloodType,
            allergies,
            dietaryRestrictions,
            vaccinations,
            medications,
            physicalDisabilities,
            mentalDisorders,
            dnrStatus
        });

        await newPreset.save();

        res.status(201).json({ message: 'Preset added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error adding preset', error: err.message });
    }
});

infoRouter.put('/update-preset', async (req, res) => {
    try {
        const {
            username,
            presetID,
            firstName,
            lastName,
            age,
            phoneNum,
            emerContactNum,
            email,
            address,
            bloodType,
            allergies,
            dietaryRestrictions,
            vaccinations,
            medications,
            physicalDisabilities,
            mentalDisorders,
            dnrStatus
        } = req.body;

        if (!username) {
            return res.status(400).json({ message: 'Username is required' });
        }
        
        if (!presetID) {
            return res.status(400).json({ message: 'PresetID is required' });
        }

        const updatedPreset = await Preset.findOneAndUpdate(
            { username, presetID },
            {
                firstName,
                lastName,
                age,
                phoneNum,
                emerContactNum,
                email,
                address,
                bloodType,
                allergies,
                dietaryRestrictions,
                vaccinations,
                medications,
                physicalDisabilities,
                mentalDisorders,
                dnrStatus
            },
            { new: true }
        );

        if (!updatedPreset) {
            return res.status(404).json({ message: 'Preset not found' });
        }

        res.status(200).json({ message: 'Preset updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating preset', error: err.message });
    }
});

infoRouter.post('/get-info', async (req, res) => {
    try{
        const { username, presetID } = req.body;
        
        if (!username){
            return res.status(400).json({ message: 'Username is required'});
        }
        
        if (!presetID){
            return res.status(400).json({ message: 'Preset ID is required'});
        }
        
        const preset = await Preset.findOne({ username, presetID });
        
        if (!preset){
            return res.status(404).json({ message: 'Preset not found for this user' });
        }
        
        const projection = { _id: 0 };
        
        for (const field in preset.toObject()) {
            if (field !== 'username' && field !== 'presetID') {
                if (preset[field]) {
                    projection[field] = 1;
                }
            }
        }
        
        const userInfo = await UserInfo.aggregate([
            { $match: { username }},
            { $project: projection}
        ]);
        
        if (!userInfo.length) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.status(200).json({ data: userInfo[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching user info', error: err.message });
    }
});

infoRouter.post('/get-allinfo', async (req, res) => {
    try{
        const { username } = req.body;
        
        if (!username){
            return res.status(400).json({ message: 'Username is required'});
        }
                
        const userinfo = await UserInfo.findOne({ username }).select('-username');
        
        if (!userinfo){
            return res.status(404).json({ message: 'Data not found for this user' });
        }
        
        res.status(200).json({ data: userinfo });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching user info', error: err.message });
    }
});

infoRouter.post('/get-preset', async (req, res) => {
    try{
        const { username, presetID } = req.body;

        if (!username){
            return res.status(400).json({ message: 'Username is required'});
        }
        
        if (!presetID){
            return res.status(400).json({ message: 'Preset ID is required'});
        }

        const preset = await Preset.findOne({ username, presetID }).select('-username -presetID -qrCode');
            
        if (!preset){
            return res.status(404).json({ message: 'Preset not found for this user' });
        }

        res.status(200).json({ data: preset });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching user info', error: err.message });
    }
});

infoRouter.post('/get-qr', async (req, res) => {
    try{
        const{ username, presetID } = req.body;

        if (!username){
            return res.status(400).json({ message: 'Username is required'});
        }
        
        if (!presetID){
            return res.status(400).json({ message: 'Preset ID is required'});
        }

        const preset = await Preset.findOne({ username, presetID });

        if (!preset){
            return res.status(400).json({ message: 'QR code not found'});
        }

        res.status(200).json({ qrCode: preset.qrCode });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching qr code' });
    }
});

const generate_qr = async (username, presetID) => {
    try{
        const qrData = JSON.stringify({ username, presetID });
        return await QRCode.toDataURL(qrData);
    }catch(err){
        throw new Error("Error generating qr");
    }
}

export default infoRouter;
