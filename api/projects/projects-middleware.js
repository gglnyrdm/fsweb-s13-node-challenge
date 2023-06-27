const projectModel= require("./projects-model")

// projects ara yazılımları buraya
const checkProjectId = async (req,res,next) => {
    try {
        const isExistProject = await projectModel.get(req.params.id);
        if(!isExistProject){
            res.status(404).json({message:"proje bulunamadı"})
        }else {
            req.existProject = isExistProject;
            next();
        }
    } catch (error) {
        next(error);
    }
}

const validatePayload = async (req,res,next) => {
    try {
        let {name, description} = req.body;
        if(!name || !description){
            res.status(400).json({message:"boş alanları doldurunuz"})
        }else {
            next();
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {checkProjectId,validatePayload}