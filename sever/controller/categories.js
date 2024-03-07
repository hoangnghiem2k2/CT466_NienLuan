const { toTitleCase } = require("../config/function");
const categoryModel = require("../models/categories");

class Category {
    async getAllCategory(req, res) {
        try {
            let Categories = await categoryModel.find({}).sort({ _id: -1 });
            if (Categories) {
                return res.json({ Categories });
            }
        } catch (err) {
            console.log(err);
        }
    }

    async postAddCategory(req, res) {
        let { Type, Description } = req.body;

        if (!Type || !Description) {
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
                let checkCategoryExists = await categoryModel.findOne({ Type: Type });
                if (checkCategoryExists) {
                    
                        return res.json({ error: "Category already exists" });
                } else {
                    let newCategory = new categoryModel({
                        Type,
                        Description,
                    });
                    await newCategory.save((err) => {
                        if (!err) {
                            return res.json({ success: "Category created successfully" });
                        }
                    });
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    async postEditCategory(req, res) {
        let { cId,Type, Description } = req.body;
        if (!cId || !Description || !Type) {
            return res.json({ error: "All filled must be required" });
        }
        try {
            let editCategory = categoryModel.findByIdAndUpdate(cId, {
                Description,
                Type,

                updatedAt: Date.now(),
            });
            let edit = await editCategory.exec();
            if (edit) {
                return res.json({ success: "Category edit successfully" });
            }
        } catch (err) {
            console.log(err);
        }
    }

    async getDeleteCategory(req, res) {
        let { cId } = req.body;
        if (!cId) {
            return res.json({ error: "All filled must be required" });
        } else {
            try {

                let deleteCategory = await categoryModel.findByIdAndDelete(cId);
                if (deleteCategory) {
                
                    
                        return res.json({ success: "Category deleted successfully" });
                    
                }
            } catch (err) {
                console.log(err);
            }
        }
    }
}

const categoryController = new Category();
module.exports = categoryController;