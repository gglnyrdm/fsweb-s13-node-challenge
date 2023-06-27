// "eylem" routerını buraya yazın
const actionRouter = require("express").Router();
const e = require("express");
const mw = require("./actions-middlware");
const actionModel = require("./actions-model");

actionRouter.get("/", async(req,res,next) => {
    try {
        const allActions = await actionModel.get();
        res.json(allActions);
    } catch (error) {
        next(error);
    }
});

actionRouter.get("/:id",mw.checkActionId, (req,res,next) => {
    try {
        res.json(req.existAction);
    } catch (error) {
        next(error);
    }
});

actionRouter.post("/",mw.validatePayload, async(req,res,next) => {
    try {
        const insertActionModel = {
            project_id:req.body.project_id,
            description:req.body.description,
            notes:req.body.notes,
            completed:req.body.completed
        }
        const insertedAction = await actionModel.insert(insertActionModel);
        res.status(201).json(insertedAction);
    } catch (error) {
        next(error);
    }
});

actionRouter.put("/:id",mw.checkActionId,mw.validatePayload,async (req,res,next) => {
    try {
        const updateActionModel = {
            project_id:req.body.project_id,
            description:req.body.description,
            notes:req.body.notes,
            completed:req.body.completed
        }
        const updatedAction = await actionModel.update(req.params.id,updateActionModel);
        res.status(200).json(updatedAction);
    } catch (error) {
        next(error);
    }
});

actionRouter.delete("/:id",mw.checkActionId, async(req,res,next) => {
    try {
        await actionModel.remove(req.params.id);
        res.json({message:`${req.params.id} 'li kayıt silindi`})
    } catch (error) {
        next(error);
    }
});


module.exports = actionRouter;