const dishesModel = require("../models/dishes");
const fs = require("fs");
const path = require("path");


class Dishes {

  static deleteImages(images, mode) {
    var basePath =
      path.resolve(__dirname + "../../") + "/public/uploads/dishes/";
    console.log(basePath);
    for (var i = 0; i < images.length; i++) {
      let filePath = "";
      if (mode == "file") {
        filePath = basePath + `${images[i].filename}`;
      } else {
        filePath = basePath + `${images[i]}`;
      }
      console.log(filePath);
      if (fs.existsSync(filePath)) {
        console.log("Exists image");
      }
      fs.unlink(filePath, (err) => {
        if (err) {
          return err;
        }
      });
    }
  }

  async getAllDishes(req, res) {
    try {
      let Dishes = await dishesModel
        .find({})
        .populate("pCategory", "_id cName")
        .sort({ _id: -1 });
      if (Dishes) {
        return res.json({ Dishes });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async postAddDish(req, res) {
    let { Name, Description, Price, Quantity, Category,AllIngredients:[] } =
      req.body;
    let images = req.files;
    // Validation
    if (
      !Name |
      !Description |
      !Price |
      !Quantity |
      !Category 
    ) {
      Dishes.deleteImages(images, "file");
      return res.json({ error: "All filled must be required" });
    }
    // Validate Name and description
    else if (Name.length > 255 || Description.length > 3000) {
      Dishes.deleteImages(images, "file");
      return res.json({
        error: "Name 255 & Description must not be 3000 charecter long",
      });
    }
    // Validate Images
    else if (images.length !== 2) {
      Dishes.deleteImages(images, "file");
      return res.json({ error: "Must need to provide 2 images" });
    } else {
      try {
        let allImages = [];
        for (const img of images) {
          allImages.push(img.filename);
        }
        let newDish = new dishesModel({
          Images: allImages,
          Name,
          Description,
          Price,
          Quantity,
          Category,
          AllIngredients:[]
          
        });
        let save = await newDish.save();
        if (save) {
          return res.json({ success: "Dish created successfully" });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async postEditDish(req, res) {
    let {
      Id,
      Name,
      Description,
      Price,
      Quantity,
      Category,
      Images,
      AllIngredients:[]
    } = req.body;
    let editImages = req.files;

    // Validate other fileds
    if (
      !Id |
      !Name |
      !Description |
      !Price |
      !Quantity |
      !Category 
    ) {
      return res.json({ error: "All filled must be required" });
    }
    // Validate Name and description
    else if (Name.length > 255 || Description.length > 3000) {
      return res.json({
        error: "Name 255 & Description must not be 3000 charecter long",
      });
    }
    // Validate Update Images
    else if (editImages && editImages.length == 1) {
      Dishes.deleteImages(editImages, "file");
      return res.json({ error: "Must need to provide 2 images" });
    } else {
      let editData = {
        Name,
        Description,
        Price,
        Quantity,
        Category,
      };
      if (editImages.length == 2) {
        let allEditImages = [];
        for (const img of editImages) {
          allEditImages.push(img.filename);
        }
        editData = { ...editData, pImages: allEditImages };
        Dishes.deleteImages(Images.split(","), "string");
      }
      try {
        let editDish = dishesModel.findByIdAndUpdate(pId, editData);
        editDish.exec((err) => {
          if (err) console.log(err);
          return res.json({ success: "Dish edit successfully" });
        });
      } catch (err) {
        console.log(err);
      }
    }
  }

  async getDeleteDish(req, res) {
    let { Id } = req.body;
    if (!Id) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let deleteDishesObj = await dishesModel.findById(Id);
        let deleteDish = await dishesModel.findByIdAndDelete(Id);
        if (deleteDish) {
          Dishes.deleteImages(deleteDishesObj.Images, "string");
          return res.json({ success: "Dish deleted successfully" });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async getSingleDish(req, res) {
    let { Id } = req.body;
    if (!Id) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let singleDish = await dishesModel
          .findById(Id)
          .populate("Category", "Name")
          .populate("RatingsReviews.user", "name email");
        if (singleDish) {
          return res.json({ Dishes: singleDish });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async getDishesByCategory(req, res) {
    let { catId } = req.body;
    if (!catId) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let dishes = await dishesModel
          .find({ Category: catId })
          .populate("Category", "Name");
        if (dishes) {
          return res.json({ Dishes : dishes });
        }
      } catch (err) {
        return res.json({ error: "Search dishes wrong" });
      }
    }
  }

  async getDishesByPrice(req, res) {
    let { price } = req.body;
    if (!price) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let dishes = await dishesModel
          .find({ Price: { $lt: price } })
          .populate("Category", "Name")
          .sort({ Price: -1 });
        if (dishes) {
          return res.json({ Dishes: dishes });
        }
      } catch (err) {
        return res.json({ error: "Filter dishes wrong" });
      }
    }
  }

  

  async getCartDish(req, res) {
    let { dishesArray } = req.body;
    if (!dishesArray) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let cartDishes = await dishesModel.find({
          _id: { $in:  dishesArray },
        });
        if (cartDishes) {
          return res.json({ Dishes: cartDishes });
        }
      } catch (err) {
        return res.json({ error: "Cart dish wrong" });
      }
    }
  }

  async postAddReview(req, res) {
    let { pId, uId, rating, review } = req.body;
    if (!pId || !rating || !review || !uId) {
      return res.json({ error: "All filled must be required" });
    } else {
      let checkReviewRatingExists = await Dishes.findOne({ _id: pId });
      if (checkReviewRatingExists.pRatingsReviews.length > 0) {
        checkReviewRatingExists.pRatingsReviews.map((item) => {
          if (item.user === uId) {
            return res.json({ error: "Your already reviewd the dishes" });
          } else {
            try {
              let newRatingReview = dishesModel.findByIdAndUpdate(pId, {
                $push: {
                  pRatingsReviews: {
                    review: review,
                    user: uId,
                    rating: rating,
                  },
                },
              });
              newRatingReview.exec((err, result) => {
                if (err) {
                  console.log(err);
                }
                return res.json({ success: "Thanks for your review" });
              });
            } catch (err) {
              return res.json({ error: "Cart dish wrong" });
            }
          }
        });
      } else {
        try {
          let newRatingReview = dishesModel.findByIdAndUpdate(pId, {
            $push: {
              pRatingsReviews: { review: review, user: uId, rating: rating },
            },
          });
          newRatingReview.exec((err, result) => {
            if (err) {
              console.log(err);
            }
            return res.json({ success: "Thanks for your review" });
          });
        } catch (err) {
          return res.json({ error: "Cart dish wrong" });
        }
      }
    }
  }

  async deleteReview(req, res) {
    let { rId, pId } = req.body;
    if (!rId) {
      return res.json({ message: "All filled must be required" });
    } else {
      try {
        let reviewDelete = dishesModel.findByIdAndUpdate(pId, {
          $pull: { pRatingsReviews: { _id: rId } },
        });
        reviewDelete.exec((err, result) => {
          if (err) {
            console.log(err);
          }
          return res.json({ success: "Your review is deleted" });
        });
      } catch (err) {
        console.log(err);
      }
    }
  }
}

const DishesController = new Dishes();
module.exports = DishesController;