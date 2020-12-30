const db = require("../models");
const User = require("../models/user.model")

// grabs the location model from index where everything is brought together
const Location = db.location;

// Query database for county and if it doesnt exist create a new location

exports.findOrCreate = (req, res) => {
    // location.findOne(
    //     {county: req.body.county, 
    //      state: req.body.state,
    //     country: req.body.country,
    //     city: req.body.city}
    // )
    const location = req.body.county
    console.log(location)
    Location.find({location}).then((data) =>{
        console.log(data)
        if(data.length < 1) {
        // console.log("-----testing--")
            const location = new Location({
                city: req.body.city,
                state: req.body.state,
                country: req.body.country,
                county: req.body.county
            });
            // Save Location in the database
            location.save(location)
            .then((data) => {
                res.send(data)
            })
            .catch(err=>{
                res.status(500).send({
                message: err.message || "Some error occurred while retrieving location"
            })
    })
        } else {
            res.send(data)
        }
    
    })

}

// find all location
// exports.findAll = (req,res) => {
//     Location.find({county}).then(data=>{
//       res.send(data)
//     })
//     .catch(err=>{
//       res.status(500).send({
//         message: err.message || "Some error occurred while retrieving tutorials"
//       })
//     })
//   },

    // Find a single Location with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    // Find Location by the id being passed by id
    Location.findById(id).then((data) => {
            if(!data){
                res.status(400).send({message: "Not found Location with id" + id});
            }else{
                res.send(data)
            }
    });
},

// PUSH // Add location to favorites
exports.addToFavoriteLocations = (req, res) => {
    const id = req.params.id
    User.updateOne(
        {_id: req.userId},
        {$addToSet: {favoriteLocations: id}}
    )
    .then(data => {
        res.send(data)
    })
    .catch(err=>{
        res.status(500).send({
          message: err.message || 'An error occurred while retrieving favorite locations'
        })
    })
},


// Add to Search Locations

exports.addToSearchLocations = (req, res) => {
    const id = req.params.id
    User.updateOne(
        {_id: req.userId},
        {$push: {searchLocations: id}}
    )
    .then(data => {
        res.send(data)
    })
    .catch(err=>{
        res.status(500).send({
          message: err.message || 'An error occurred while retrieving search locations'
        })
    })
}





// exports.findAllFavoriteLocations = (req, res) => {
//     db.user.find({favoriteLocations}).then(data=>{
//         res.send(data)
//       })
//       .catch(err=>{
//         res.status(500).send({
//           message: err.message || "Some error occurred while retrieving Locations"
//         })
//       })
// };


// exports.findAllSearchLocations = (req, res) => {
//     db.user.find({searchLocations}).then(data=>{
//         res.send(data)
//       })
//       .catch(err=>{
//         res.status(500).send({
//           message: err.message || "Some error occurred while retrieving Locations"
//         })
//       })
// };

// Delete a Location with the specified id in the request
// exports.delete = (req, res) => {
//     const id = req.params.id;
//     // Find Location by the id being passed by id then remove it
//     Location.findByIdAndRemove(id, {useFindAndModify: false}).then((data) => {
//         if(!data){
//             res.status(400).send({message: "Not found Location with id" + id});
//         }else{
//             res.send(data)
//         }
// });
// };

// Update a Location by the id in the request
// exports.update = (req, res) => {
//     const id = req.params.id;
//     // Find Location by the id being passed by id then update it
//     Location.findByIdAndUpdate(id, {city: req.body.city, state: req.body.state, country: req.body.country, county: req.body.county, zipcode: req.body.zipcode}).then((data) => {
//         if(!data){
//             res.status(400).send({message: "Not found Location with id" + id});
//         }else{
//             res.send(data)
//         }
        
//     })
//     .catch((err) => {
//         res.status(500).send({
//         message: err.message || "Some error occurred while retrieving location"
//         })
//     })

// };

