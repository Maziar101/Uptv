import Category from "../models/Category.js";
import ApiFeatures from "../utils/apiFeatures.js";
import catchAsync from "../utils/catchAsync.js";

export const getAllCategory = catchAsync(async(req,res,next)=>{
    const features = new ApiFeatures(Category,req.query).filters().limitFields().paginate().sort();
    const categories = await features.query;
    return res.status(200).json({
        status:"success",
        data: {categories},
    });
});

export const deleteCategory = catchAsync(async(req,res,next)=>{
    await Category.findByIdAndDelete(req.params.id);
    return res.status(200).json({
        status: "success",
        message: `Category By Id ${req.params.id} Deleted Successfully`,
    });
});

export const updateCategory = catchAsync(async (req,res,next)=>{
    const category = Category.findByIdAndUpdate(req.params.id,req.body,{new:true});
    return res.status(200).json({
        status: "success",
        message: `Category By Id ${req.params.id} Updated Successfully`,
        data: {category},
    });
});

export const createCategory = catchAsync(async (req,res,next)=>{
    const category = await Category.create(req.body);
    return res.status(201).json({
        status: "success",
        message: `Category Created Successfully`,
        data: {category},
    });
});