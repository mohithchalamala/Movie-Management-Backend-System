const Moviesmodel = require("../../movie_model");
const cloudinary = require("../../cloudinary/cloudinaryConfig");
const Movieratingmodel = require('../../movie_rating_model')

const createmovie = (req, res) => {
    const file = req?.file ? req?.file?.path : "";
    const { moviename, publish } = req.body;

    if (!file || !moviename || !publish) {
        return res.json("All fields Required");
    }

    cloudinary.uploader.upload(file)
        .then((uploadResult) => {
            Moviesmodel.findOne({ moviename: moviename })
                .then((existingMovie) => {
                    if (existingMovie) {
                        return res.json('Movie already exists');
                    } else {
                        const newMovie = new Moviesmodel({
                            userid: req.userMainId,
                            moviename,
                            image: uploadResult.secure_url,
                            publish
                        });
                        newMovie.save()
                            .then(() => {
                                res.json('Movie created successfully');
                            })
                            .catch((saveError) => {
                                console.log(saveError);
                                res.json('Error while saving the movie');
                            });
                    }
                })
                .catch((findError) => {
                    console.log(findError);
                    res.json('Error while checking for existing movie');
                });
        })
        .catch((uploadError) => {
            console.log(uploadError);
            res.json('Error while uploading image');
        });
};


// moviename: This is the field in the MongoDB document that you want to search.
// $regex: This is a MongoDB operator that allows you to perform a search using a regular expression. A regular expression is a pattern that can match text strings, providing powerful search capabilities.
const getallusermovie = (req,res) =>{
    const search = req.query.search || ""       //this req.query.search will contain the string in the query present in url ex- http://localhost:3000/movies/api/getallmovie?search=In
    const sort = req.query.sort || ""
    const query = {
        moviename :{$regex:search,$options:"i"}
    }
    Moviesmodel.find(query)
    .sort({_id:sort == 'new' ? -1 : 1})         //when the sort query in the url is assigned with new, the latest uploaded movies will display first, -1 -> bottom most data
    .then((result)=>{
        res.json(result) 
    })
    .catch(e=>{
        console.log(e)
    })
}


const updatemovie = async (req, res) => {
    const id = req.params.id;
    const file = req?.file ? req.file.path : '';
    const { moviename, publish, image } = req.body;

    let upload;

    try {
        if (file) {
            upload = await cloudinary.uploader.upload(file);
        }
        const dynamicimg = file ? upload.secure_url : image;

        const updatedMovie = await Moviesmodel.findByIdAndUpdate(
            id,
            {
                userid: req.userMainId,
                moviename,
                image: dynamicimg,
                publish
            },
            { new: true }
        );

        await updatedMovie.save();
        res.json({ message: 'movie successfully updated', updatedMovie });
    } catch (e) {
        res.json(e);
    }
};

const moviedelete = (req,res) =>{
    const id = req.params.id
    Moviesmodel.findByIdAndDelete(id)
    .then((result)=>{
        res.json({message:'Deleted Succesfully',id})
    })
    .catch(e=>{
        console.log(e)
    })
}

const getsinglemovie = (req,res) =>{
    const id = req.params.id
    Moviesmodel.findById(id)
    .then((result)=>{
        res.json({message:'Movie Found',result})
    })
    .catch(e=>{
        console.log(e)
    })
}


const addmovierating = (req,res) =>{
    const {movieid} = req.params
    const {username,description,rating} = req.body
    console.log("req.userMainId",req.userMainId)
    console.log('req.userMainId ',username,rating,description )
    if(!movieid || !username || ! description || !rating){
        res.json('All field Required')
    }
    else{
        const x = new Movieratingmodel({
            userid:req.userMainId,movieid,username,description,rating
        })
        x.save()
        .then((result)=>{
            res.json('Saved Successfully')
        })
        .catch(e=>{
            console.log(e)
        })
    }

}

const getmovierating = (req,res) =>{
    const {movieid} = req.params
    Movieratingmodel.find({movieid:movieid})
    .then((result)=>{
        res.json(result)
    })
    .catch(e=>{
        console.log(e)
    })
}

const deleterating = (req,res) =>{
    const {ratingid} = req.params
    Movieratingmodel.findByIdAndDelete(ratingid)
    .then((result)=>{
        res.json('Deleted Rating')
    })
    .catch(e=>{
        console.log(e)
    })
}

module.exports = {
    createmovie,
    getallusermovie,
    updatemovie,
    moviedelete,
    getsinglemovie,
    addmovierating,
    getmovierating,
    deleterating
};