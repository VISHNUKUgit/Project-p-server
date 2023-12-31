const projects = require("../DataBase/Models/projectSchema")

exports.addProjects = async (req, res) => {
    console.log("inside add projects function");
    const userId = req.payload
    const projectImg = req.file.filename
    const { title, languages, github, website, overview } = req.body
    // console.log(req.body,projectImage);
    try {
        const existingProject = await projects.findOne({ github })
        if (existingProject) {
            res.status(406).json("Project already exist### Upload another")

        } else {
            const newProject = new projects({
                title, languages, github, website, overview, projectImg, userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }

    } catch (error) {
        res.status(401).json(`add project api failed error: ${error}`)
    }

}


// get user Projects
exports.userProjects = async (req, res) => {
    console.log("inside userProjects function");
    const userId = req.payload

    try {
        const allUserProject = await projects.find({ userId })
        // {userId:userId} key and value are same here so just use just one key or value
        res.status(200).json(allUserProject)

    } catch (error) {
        res.status(401).json(`get user project API call error: ${error}`)
    }
}

// get all Projects
exports.getAllProjects = async (req, res) => {
    console.log("inside getAllProjects function");
    const searchValue = req.query.search
    const query = {
        languages:{$regex:searchValue ,$options:"i"}
    }
    try {
        const allProject = await projects.find(query)
        // {userId:userId} key and value are same here so just use just one key or value
        res.status(200).json(allProject)

    } catch (error) {
        res.status(401).json(`get all Projects API call error: ${error}`)
    }
}

// get threeProjects
exports.getThreeProjects = async (req, res) => {
    console.log("inside getThreeProjects function");
    try {
        const threeProject = await projects.find().limit(3)
        // {userId:userId} key and value are same here so just use just one key or value
        res.status(200).json(threeProject)

    } catch (error) {
        res.status(401).json(`get threeProjects API call error: ${error}`)
    }
}

// edit Project

exports.editProjectDetails = async(req,res)=>{
    console.log("inside edit project")
    const {id} = req.params
    const userId = req.payload
    const {
        title,
        languages,
        github,
        website,
        overview,
        projectImg}= req.body
    const uploadProjectImage = req.file?req.file.filename:projectImg
    try {
        const updateProject = await projects.findByIdAndUpdate({_id:id},{title,
            languages,
            github,
            website,
            overview,
            projectImg:uploadProjectImage,
            userId},{new:true})
            await updateProject.save()
            res.status(200).json(updateProject)
    } catch (error) {
        res.status(200).json(error)
    } 

}

// delete a project

exports.deleteProjectController = async(req,res)=>{
    console.log("inside delete controller");
    
    const {id} = req.params
    console.log(id);
    // res.status(200).json(id)

// res.status(200).json("ok")
    // const { id } = req.query

    try {
        const removeProject = await projects.findByIdAndDelete({_id:id})
        res.status(200).json(removeProject)
        
    } catch (error) {
        res.status(401).json(error)
    }

}