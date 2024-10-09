import validator from 'validator';
import bcrypt from 'bcryptjs';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import appointmentModel from '../models/appointmentModel.js';
import razorpay from 'razorpay';





// API to register a user
const registerUser = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        if(!name || !email || !password){
            return res.json({
                success: false,
                message: "All fields are required"
            })
        }


        // checking if email is valid
        if(!validator.isEmail(email)){
            return res.json({
                success: false,
                message: "Invalid email"
            })
        }


        // checking if password is strong
        if(password.length < 8){
            return res.json({
                success: false,
                message: "Password must be at least 8 characters"
            })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData);
        const user = await newUser.save();

        // creating jwt token
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);

        res.json({
            success: true,
            token
        });


    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}



// API for User Login
const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({email});

        if(!user){
            return res.json({
                success: false,
                message: "User not found"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(isMatch){
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
            res.json({
                success: true,
                token
            })
        }
        else{
            res.json({
                success: false,
                message: "Invalid password"
            })
        }
        
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

// API to get user profile data
const getProfile = async (req, res) => {

    try {
        const { userId } = req.body;
        const userData = await userModel.findById(userId).select('-password');
        res.json({
            success: true,
            userData
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}


// API to update user profile
const updateProfile = async (req, res) => {

    try {
        const { userId, name, phone, address, dob, gender } = req.body;
        const imageFile = req.file;

        if(!name || !phone || !dob || !gender){
            return res.json({
                success: false,
                message: "All fields are required"
            })
        }

        await userModel.findByIdAndUpdate(userId, {
            name,
            phone,
            address:JSON.parse(address),
            dob,
            gender
        });

        if(imageFile){
            // upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: "image"});
            const imageUrl = imageUpload.secure_url;
            await userModel.findByIdAndUpdate(userId, {
                image: imageUrl
            });
        }
        

        res.json({
            success: true,
            message: "Profile Updated Successfully"
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

// API to book an appointment
const bookAppointment = async (req, res) => {

    try {
        const { userId, docId, slotDate, slotTime } = req.body;

        const docData = await doctorModel.findById(docId).select('-password');

        if(!docData.available){
            return res.json({
                success: false,
                message: "Doctor not Available"
            })
        }

        let slots_booked = docData.slots_booked;

        // checking for slots availability
        if(slots_booked[slotDate]){
            if(slots_booked[slotDate].includes(slotTime)){
                return res.json({
                    success: false,
                    message: "Slot not Available"
                })
            } else{
                slots_booked[slotDate].push(slotTime);
            }
        } else{
            slots_booked[slotDate] = [];
            slots_booked[slotDate].push(slotTime);
        }


        const userData = await userModel.findById(userId).select('-password');

        delete docData.slots_booked;

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotDate,
            slotTime,
            date: Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();


        // save new slots data in docData
        await doctorModel.findByIdAndUpdate(docId, {
            slots_booked
        });

        res.json({
            success: true,
            message: "Appointment Booked Successfully"
        })


    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }

}


// API to get user appointments
const listAppointment = async (req, res) => {
    try{

        const { userId } = req.body;
        const appointments = await appointmentModel.find({userId});
        res.json({
            success: true,
            appointments
        })

    } catch (error){
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}


// API to cancel an appointment
const cancelAppointment = async (req, res) => {
    try{

        const { appointmentId, userId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);

        // verify appointment with userId
        if(appointmentData.userId !== userId){
            return res.json({
                success: false,
                message: "Unauthorized access"
            })
        }

        // cancel appointment
        await appointmentModel.findByIdAndUpdate(appointmentId, {
            cancelled: true
        })

        // release doctor slot
        const {slotDate, slotTime, docId} = appointmentData;
        const doctorData = await doctorModel.findById(docId);

        let slots_booked = doctorData.slots_booked;

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);

        await doctorModel.findByIdAndUpdate(docId, {
            slots_booked
        });

        res.json({
            success: true,
            message: "Appointment Cancelled Successfully"
        })

    } catch (error){
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}



const razorpayInstance = new razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

// API to make payment
const paymentRazorpay = async (req, res) => {

    try{

        const {appointmentId} = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);

        if(!appointmentData || appointmentData.cancelled){
            return res.json({
            success: false,
            message: "Appointment Cancelled or Not Found"
            })
        }

        // creating options for razorpay payment
        const options = {
            amount: appointmentData.amount * 100,
            currency: process.env.CURRENCY,
            receipt: appointmentId
        }

        // creating order in razorpay
        const order = await razorpayInstance.orders.create(options);

        res.json({
            success: true,
            order
        })

    } catch (error){
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

// API to verify payment
const verifyRazorpay = async (req, res) => {
    try{

        const {razorpay_order_id} = req.body;
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

        if(orderInfo.status === "paid"){

            await appointmentModel.findByIdAndUpdate(orderInfo.receipt, {
                payment: true
            })

            res.json({
                success: true,
                message: "Payment Successful"
            })
        } else{
            res.json({
                success: false,
                message: "Payment Failed"
            })
        }



    } catch (error){
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

export {registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, paymentRazorpay, verifyRazorpay};
