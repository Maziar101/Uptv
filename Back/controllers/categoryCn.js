import Category from "../models/Category.js";
import ApiFeatures from "../utils/apiFeatures.js";
import catchAsync from "../utils/catchAsync.js";

export const getAllCategory = catchAsync(async (req, res, next) => {
    const features = new ApiFeatures(Category, req.query).filters().limitFields().paginate().sort();
    const categories = await features.query;
    return res.status(200).json({
        status: "success",
        data: { categories },
    });
});

export const deleteSubCategory = catchAsync(async (req, res, next) => {
    const category = await Category.findById(req.params.catid);
    const subs = category.submenu?.filter((sub) => {
        return sub._id.toString() !== req.params.subid; // مقایسه به صورت رشته
    });

    await Category.findByIdAndUpdate(req.params.catid, { submenu: subs }, { new: true });

    return res.status(200).json({
        status: "success",
        message: `Submenu By Id ${req.params.subid} In Category ${category.englishName} Deleted Successfully`
    });
});

export const updateCategory = catchAsync(async (req, res, next) => {
    const category = await Category.findById(req.params.catid);
    
    const subs = category.submenu.map((sub) => {
        if (sub._id == req.params.subid) {
            sub.name = req.body.name;
        }
        return sub;
    });
    await Category.findByIdAndUpdate(req.params.subid,{name:req.body.name},{new:true});

    await Category.findByIdAndUpdate(req.params.catid, { submenu: subs }, { new: true });

    return res.status(200).json({
        status: "success",
        message: `Submenu By Id ${req.params.subid} In Category ${category.name} Updated Successfully`
    });
});


export const deleteCategory = catchAsync(async (req, res, next) => {
    await Category.findByIdAndDelete(req.params.id);
    return res.status(200).json({
        status: "success",
        message: `Category By Id ${req.params.id} Deleted Successfully`,
    });
});



export const createCategory = catchAsync(async (req, res, next) => {
    console.log(req.body); // اضافه کردن لاگ برای بررسی داده‌ها
    try {
        const category = await Category.create(req.body);
        return res.status(201).json({
            status: "success",
            message: "Category Created Successfully",
            data: { category },
        });
    } catch (err) {
        return res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
});