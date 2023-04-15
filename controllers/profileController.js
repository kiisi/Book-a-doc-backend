

module.exports.profile = (req, res) =>{
    const id = req.params.id
    console.log(id)
    console.log(req.body)

    res.send({seen: 'True', _id: id, body: req.body})
}