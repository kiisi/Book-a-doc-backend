const AppointmentModel = require("../models/appointmentModel")
const UserModel = require("../models/userModel")

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

    let appointments = await AppointmentModel.find({hospital: hospital_id})

    if(appointments.length > 0){

        let last_appointment_expiry = appointments[appointments.length - 1].expires_at
    
        let remaining_mins = Math.trunc((last_appointment_expiry - Date.now()) / (1000 * 60))
    
        if(remaining_mins > 0){
            return res.status(200).json({error: `Wait for ${remaining_mins} minute(s), there is an ongoing appointment` })
        }else{
            let appointment_expiry = Date.now() + 900000
            let new_appointment = await AppointmentModel.create({ hospital: hospital_id, user: user_id, expires_at: appointment_expiry})
            return res.status(201).json({success: "Your appointment has been book", data: new_appointment}) 
        }

    }else{
        let appointment_expiry = Date.now() + 900000
        let new_appointment = await AppointmentModel.create({ hospital: hospital_id, user: user_id, expires_at: appointment_expiry})
        
        return res.status(201).json({success: "Your appointment has been book", data: new_appointment}) 
    }

}