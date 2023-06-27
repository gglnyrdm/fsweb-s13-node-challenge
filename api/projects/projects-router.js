const projectRouter = require("express").Router();
const mw = require("./projects-middleware");
const projectModel = require("./projects-model");

// "project" routerını buraya yazın!
projectRouter.get("/", async(req,res,next) => {
    try {
        const allProjects = await projectModel.get();
        res.json(allProjects);
    } catch (error) {
        next(error);
    }
});

projectRouter.get("/:id",mw.checkProjectId, (req,res,next) => {
    try {
        res.json(req.existProject);
    } catch (error) {
        next(error);
    }
});

projectRouter.post("/",mw.validatePayload, async(req,res,next) => {
    try {
        const insertProjectModel = {
            name:req.body.name,
            description:req.body.description,
            completed:req.body.completed
        }
        const insertedProject = await projectModel.insert(insertProjectModel);
        res.status(201).json(insertedProject);
    } catch (error) {
        next(error);
    }
});

projectRouter.put("/:id",mw.checkProjectId,mw.validatePayload, async(req,res,next) => {
    try {
        const updateProjectModel = {
            name:req.body.name,
            description:req.body.description,
            completed:req.body.completed
        }
        const updatedProject = await projectModel.update(req.params.id,updateProjectModel);
        res.json(updatedProject);
    } catch (error) {
        next(error);
    }
});

projectRouter.delete("/:id",mw.checkProjectId, async(req,res,next) => {
    try {
        await projectModel.remove(req.params.id);
        res.json({message:`${req.params.id} 'li kayıt silindi`})
    } catch (error) {
        next(error);
    }
});

projectRouter.get("/:id/actions",mw.checkProjectId, async(req,res,next) => {
    try {
        let projectActions = await projectModel.getProjectActions(req.params.id);
        res.json(projectActions);
    } catch (error) {
        next(error);
    }
});


module.exports = projectRouter;