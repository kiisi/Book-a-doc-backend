const AppointmentModel = require("../models/appointmentModel")
const UserModel = require("../models/userModel")
const HospitalModel = require("../models/hospitalModel")

// User profile
module.exports.profile = async (req, res) =>{
    const id = req.params.id
    console.log(id)
    const profile_data = req.body

    let errors = {
        'height':'',
        'weight':'',
        'blood_group':'',
        'genotype':'',
    }

    let error_bool = false

    for (let key in profile_data){
        if(profile_data[key].trim() === ''){
            errors[key] = 'This field is empty!'
            error_bool = true
        }
    }

    if(error_bool){
        return res.status(403).json({error: errors})
    }

    const { height, weight, blood_group, genotype} = req.body

    try{
        await UserModel.updateOne({ _id: id }, { 
            height: height, 
            weight: weight,
            blood_group: blood_group,
            genotype: genotype 
        });
        res.status(202).json({success: 'Update successful'})
    }
    catch(err){
        res.status(500).json({server_error: "Server Error"})
        console.log(err)
    }

}


// User Info
module.exports.userInfo = async (req, res) =>{
    const id = req.params.id
    console.log(id)
    const user_info_data = req.body

    let errors = {
        'state':'',
        'city':'',
        'allergies':'',
        'description':'',
    }

    let error_bool = false

    for (let key in user_info_data){
        if(user_info_data[key].trim() === ''){
            errors[key] = 'This field is empty!'
            error_bool = true
        }
    }

    if(error_bool){
        return res.status(403).json({error: errors})
    }

    const { state, city, allergies, description } = req.body

    try{
        await UserModel.updateOne({ _id: id }, { 
            state: state, 
            city: city,
            allergies: allergies,
            description: description 
        });
        res.status(202).json({success: 'Update successful'})
    }
    catch(err){
        res.status(500).json({server_error: "Server Error"})
        console.log(err)
    }
}


module.exports.bookAppointment = async (req, res) =>{

    const { hospital_id, user_id } = req.body

    let hospital_appointments = await AppointmentModel.find({hospital: hospital_id})
    let user_appointments = await AppointmentModel.find({user: user_id})

    if(user_appointments.length > 0){
        let last_user_appointment_expiry = user_appointments[user_appointments.length - 1].expires_at
            
        let remaining_mins = Math.trunc((last_user_appointment_expiry - Date.now()) / (1000 * 60))

        if(remaining_mins > 0){
            return res.status(200).json({error: `Rest, You booked an appointment ${15 - remaining_mins} minute(s) ago.` })
        }

        let last_hospital_appointment_expiry = hospital_appointments[hospital_appointments.length - 1].expires_at
    
        remaining_mins = Math.trunc((last_hospital_appointment_expiry - Date.now()) / (1000 * 60))

        if(remaining_mins > 0){
            return res.status(200).json({error: `Wait for ${remaining_mins} minute(s), there is an ongoing appointment booking` })
        }

        let appointment_expiry = Date.now() + 900000
        let new_appointment = await AppointmentModel.create({ hospital: hospital_id, user: user_id, expires_at: appointment_expiry})
        return res.status(201).json({success: "Your appointment has been book", data: new_appointment}) 

    }else{
        let appointment_expiry = Date.now() + 900000
        let new_appointment = await AppointmentModel.create({ hospital: hospital_id, user: user_id, expires_at: appointment_expiry})
        
        return res.status(201).json({success: "Your appointment has been book", data: new_appointment}) 
    }

    // B

    // if(appointments.length > 0){

    //     if(user_appointments.length > 0){
    //         let last_user_appointment_expiry = user_appointments[user_appointments.length - 1].expires_at
            
    //         let remaining_mins = Math.trunc((last_user_appointment_expiry - Date.now()) / (1000 * 60))
    
    //         if(remaining_mins > 0){
    //             return res.status(200).json({error: `Rest, You booked an appointment ${15 - remaining_mins} minute(s) ago.` })
    //         }
    //     }

    //     let last_appointment_expiry = appointments[appointments.length - 1].expires_at
    
    //     let remaining_mins = Math.trunc((last_appointment_expiry - Date.now()) / (1000 * 60))
    
    //     if(remaining_mins > 0){
    //         return res.status(200).json({error: `Wait for ${remaining_mins} minute(s), there is an ongoing appointment booking` })
    //     }else{
    //         let appointment_expiry = Date.now() + 900000
    //         let new_appointment = await AppointmentModel.create({ hospital: hospital_id, user: user_id, expires_at: appointment_expiry})
    //         return res.status(201).json({success: "Your appointment has been book", data: new_appointment}) 
    //     }

    // }else{
    //     let appointment_expiry = Date.now() + 900000
    //     let new_appointment = await AppointmentModel.create({ hospital: hospital_id, user: user_id, expires_at: appointment_expiry})
        
    //     return res.status(201).json({success: "Your appointment has been book", data: new_appointment}) 
    // }

}

module.exports.allHospital = async (req, res) => {
    let page = parseInt(req.params.page)
    // page should start from 1
    let limit = 10

    let skip = (page - 1) * 10
    // get previous page offset

    try{
        const data = await HospitalModel.find().skip(skip).limit(limit)
        return res.status(200).json({success: "Hospitals Fetched", data: data })
    }
    catch(err){
        return res.status(401).json({error: "An error occurred" })
    }
    
}

// Get One Hospital
module.exports.oneHospital = async (req, res) => {
    let id = req.params.id

    try{
        const data = await HospitalModel.findById(id)
        return res.status(200).json({success: "Hospitals Fetched", data: data })
    }
    catch(err){
        return res.status(401).json({error: "An error occurred" })
    }
    
}