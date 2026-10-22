const noteModel = require("../models/note.model");


const createNotesController = async (req, res) => {
  console.log(req.body);

  try {
    const { title, subject } = req.body;

    const note = await noteModel.create({
      title,
      subject,
    });

    return res.status(201).json({
      message: "Note created successfully",
      data: note,
    });
  } catch (error) {
    console.log("error in receiving data", error);
    return res.status(500).json({
      message: "Failed to create note",
      error: error.message,
    });
  }
};

const getAllNotesController = async (req,res)=>{
      try{
         
        const getAllNotes = await noteModel.find();

        console.log("allNotes : ",getAllNotes);

        res.status(200).json({
            message: "notes fetched successfully",
            data: getAllNotes,
        })

      }catch(error){
        console.log("error in fetching notes", error);
        return res.status(500).json({
          message: "Failed to fetch notes",
          error: error.message,
        })
      }
}

const getNoteByIdController = async (req, res)=>{
    try{
        const id  = req.params.id;

        const note = await noteModel.findById(id);

        return res.status(200).json({
            message: "note fetched successfully",
            data: note,
        })
    }catch(error){
        console.log("Error in fetching note by id", error);
        return res.status(500).json({
            message: "note fetched Unsuccessfully",
        })
    }
}

const updateNoteController = async(req,res) => {
    try{

        const id = req.params.id;
        const data = req.body;

        const updatenote = await noteModel.findByIdAndUpdate(id, data, { returnDocument: 'after' });

        if(!updatenote){
            return res.status(404).json({
                message: "note not found",
            })
        }

        return res.status(200).json({
            message: "note updated successfully",
            data: updatenote,
        })

    }catch(error){
        console.log("Error in updating note by id", error);
        return res.status(500).json({
            message: "note updated Unsuccessfully",
        })
    }
}

const deleteNoteController = async (req, res)=>{
    try{

        const id = req.params.id;

        await noteModel.findByIdAndDelete(id);

        return res.status(200).json({
            message: "note deleted successfully",
        })

    }catch(error){
        console.log("Error in deleting note by id", error);
        res.status(500).json({
            message:"failed to delete the note",
            error: error.message,
        })
    }
}

module.exports = {createNotesController, getAllNotesController, getNoteByIdController, updateNoteController, deleteNoteController};