export const addFile = async (req, res, next) => {
    if (req.files) {
        return res.status(201).json({
            status: "success",
            message: "File uploaded successfully",
            file: req.files,
            apiField: req.body.apiField
        });
    } else {
        return res.status(400).json({
            status: "error",
            message: "No file uploaded"
        });
    };
};  