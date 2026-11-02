

const uploadImage = (req,res) => {
    try {


        let body = req.body;
        let file = req.file;

        console.log(body);
        console.log(file)

        return res.status(200).json({
            message: "File uploaded successfully!"
        })
        
    } catch (error) {

        return res.status(500).json({
            message: "Internal server error!"
        })
        
    }
}

module.exports = {uploadImage};