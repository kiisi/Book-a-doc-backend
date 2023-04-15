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