const ingredientsModel = require("../models/categories");
const fs = require("fs");
const { toTitleCase } = require("../config/function");

class ingredients {
    async getAllIngreidents (req, res) {
        try {
            let ingredients = await ingredientsModel.find({}).sort({ _id: -1 });
            if (ingredients) {
                return res.json({ ingredients });
            }
        } catch (err) {
            console.log(err);
        }
    }

    async postAddIngredients(req, res) {
        let { iName, measurement } = req.body;

        if (!iName) {
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.log(err);
                }

                return res.json({ error: "All filled must be required" });
            });
        }
        else {
            Type = toTitleCase(Type);
            try {
                let checkIngredientsExists = await ingredientsModel.findOne({ iName: iName });
                if (checkIngredientsExists) {
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            console.log(err);
                        }
                        return res.json({ error: "Ingredient already exists" });
                    });
                } else {
                    let newIngredient = new ingredients({
                        iName,
                        measurement,
                    });
                    await newIngredient.save((err) => {
                        if (!err) {
                            return res.json({ success: "Ingredient created successfully" });
                        }
                    });
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    async postEditCategory(req, res) {
        let {  iName, measurement } = req.body;
        if (!iId || !iName) {
            return res.json({ error: "All filled must be required" });
        }
        try {
            let editIngredient = ingredientsModel.findByIdAndUpdate(iId, {
                iName, 
                measurement,
                updatedAt: Date.now(),
            });
            let edit = await editIngredient.exec();
            if (edit) {
                return res.json({ success: "Ingredient edit successfully" });
            }
        } catch (err) {
            console.log(err);
        }
    }

    async getDeleteIngredient(req, res) {
        let { iId } = req.body;
        if (!iId) {
            return res.json({ error: "All filled must be required" });
        } else {
            try {
                let deletedingredient = await ingredientsModel.findById(iId);


                if (deletedingredient) {
                    
                        return res.json({ success: "Ingredient deleted successfully" });
                    
                }
            } catch (err) {
                console.log(err);
            }
        }
    }
}