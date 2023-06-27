// eylemlerle ilgili ara katman yazılımları yazın
const actionModel = require('./actions-model');

const checkActionId = async (req,res,next) => {
    try {
        const isExistAction = await actionModel.get(req.params.id);
        if(!isExistAction){
            res.status(404).json({message:"action bulunamadı"})
        }else {
            req.existAction = isExistAction;
            next();
        }
    } catch (error) {
        next(error);
    }
}

const validatePayload = async (req,res,next) => {
    try {
        let {description, notes} = req.body;
        if(!notes || !description){
            res.status(400).json({message:"boş alanları doldurunuz"})
        }else {
            next();
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {checkActionId,validatePayload}