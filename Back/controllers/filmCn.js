import Film from "../models/Film.js";
import ApiFeatures from "../utils/apiFeatures.js";
import catchAsync from "../utils/catchAsync.js";
import HandleError from "../utils/handleError.js";

export const getAllFilm = catchAsync(async (req, res, next) => {
    const features = new ApiFeatures(Film, req.query).filters().limitFields().paginate().sort();
    const Films = await features.query;
    return res.status(200).json({
        status: "success",
        data: { Films },
    });
});

export const getFilm = catchAsync(async (req, res, next) => {
    const film = await Film.findById(req.params.id);
    if (!film) {
        next(new HandleError('فیلمی با این آیدی پیدا نشد', 404));
    };
    return res.status(200).json({
        status: "success",
        data: { film },
    });
});

export const deleteFilm = catchAsync(async (req, res, next) => {
    await Film.findByIdAndDelete(req.params.id);
    return res.status(200).json({
        status: "success",
        message: `فیلم با آیدی ${req.params.id} با موفقیت پاک شد .`,
    });
});

export const updateFilm = catchAsync(async (req, res, next) => {
    const newFilm = Film.findByIdAndUpdate(req.params.id, {...req.body}, { new: true });
    return res.status(200).json({
        status: "success",
        data: { newFilm },
        message: `فیلم با آیدی ${req.params.id} با موفقیت آپدیت شد .`,
    });
});

export const createFilm = catchAsync(async(req,res,next)=>{
    const film = await Film.create(req.body);
    return res.status(201).json({
        status:"success",
        message:'فیلم با موفقیت ساخته شد',
    });
});