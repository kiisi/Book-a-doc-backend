

module.exports.profile = (req, res) =>{
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

    res.send({seen: 'True',})
}