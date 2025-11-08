import Note from "../models/Note.js";

export async function getAllNotes(req, res){
    //res.status(200).send("You just fetched the Notes");
    try {
        const notes = (await Note.find().sort({createdAt: -1})); //newest first
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error in getAllNotes Controller", error);
        res.status(500).json({message: "Internal server Error"});
    }
}

export async function createNotes(req, res){
    //res.status(201).json({message: "Note created Successfully!"});
    try{
    const {title, content} = req.body;
    const note = new Note({title, content});
    
    const savedNote = await note.save();
    res.status(201).json(savedNote);
    //console.log(title, body);
    }catch(error){
        console.error("Error in createNotes Controller", error);
        res.status(500).json({message: "Error in creating the Note"});
    }
}

export async function updateNotes(req, res){
    //res.status(200).json({message:"Note updated successfully!"});
    try {
        const {title, content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title,content},{
            new: true,
        });
        if(!updatedNote){
            return res.status(404).json({message: "Note is not found"});
        }
        res.status(200).json({message: "Note is Updated Successfully"});
    } catch (error) {
        console.error("Error in updateNotes Controller", error);
        res.status(500).json({message: "Error in updating the Note"});
    }
}

export async function deleteNotes(req, res){
    //res.status(200).json({message:"Note deleted successfully!"});
    try {
        const {title, content} = req.body;
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) {
            return res.status(404).json({message: "No note with the given ID to delete"});
        }
        res.status(200).json({message: "Note is Successfully deleted"});
    } catch (error) {
        console.error("Error in deleteNotes Controller", error);
        res.status(500).json({message: "Error in deleting the Note"});
    }    
}

export async function getNotesById(req, res){
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({message: "No note with the given ID"});
        }
        res.status(200).json(note);
    } catch (error) {
        console.error("Error in getNotesById Controller", error);
        res.status(500).json({message: "Error in finding the Note"});
    }
}