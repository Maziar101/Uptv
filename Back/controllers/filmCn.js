import Film from "../models/Film.js";
import fs from "fs";
import ApiFeatures from "../utils/apiFeatures.js";
import catchAsync from "../utils/catchAsync.js";
import HandleError from "../utils/handleError.js";
import fs from "fs";

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
    // استفاده از await برای اطمینان از یافتن فیلم
    const film = await Film.findById(req.params.id);
    if (!film){
        return res.status(404).json({
            status:'failed',
            message: `فیلم با آیدی ${req.params.id} پیدا نشد!`,
        });
    };
    console.log("first")
    const filmFolderPath = `public/films/${film?.englishName?.split(" ")?.join('-')}`;
    console.log(filmFolderPath)
    try{
        await fs.promises.rm(filmFolderPath, { recursive: true, force: true });
    }catch(err){
        return res.status(400).json({
            status: 'failed',
            message: `خطا در حذف پوشه فیلم: ${err.message}`,
        });
    };

    await Film.findByIdAndDelete(req.params.id);

    return res.status(200).json({
        status: "success",
        message: `فیلم با آیدی ${req.params.id} با موفقیت پاک شد.`,
    });
});


export const updateFilm = catchAsync(async (req, res, next) => {
    const newFilm = await Film.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });
    return res.status(200).json({
        status: "success",
        data: { newFilm },
        message: `فیلم با آیدی ${req.params.id} با موفقیت آپدیت شد .`,
    });
});

export const createFilm = catchAsync(async (req, res, next) => {
    try {
        const category = await Film.create(req.body);
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