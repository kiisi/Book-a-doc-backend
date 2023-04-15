const UserModel = require("../models/userModel")

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
            errors[key] = 'This is field is empty!'
            error_bool = true
        }
    }

    if(error_bool){
        return res.status(403).json({error: errors})
    }

    const { height, weight, blood_group, genotype} = req.body

    try{
        let u = await UserModel.updateOne({ _id: id }, { 
            height: height, 
            weight: weight,
            blood_group: blood_group,
            genotype: genotype 
        });
        console.log(u)
        res.status(202).json({success: 'Update successful'})
    }
    catch(err){
        console.log(err)
    }

}