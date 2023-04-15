

module.exports.profile = (req, res) =>{
    console.log(req.body)

    res.send({seen: 'True'})
}