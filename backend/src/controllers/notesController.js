import Note from "../models/Note.js" 

export async function getAllNotes(req, res) {
    try {
        const notes = await Note.find().sort({createdAt: -1}); // latest notes first
        res.status(200).json(notes);
    } catch (error) {
        console.log("Error in getAllNotes controller", error);
        res.status(500).json({ message: "Internal Server Error"});
    }
}

export async function getNoteById(req, res) {
    try {
        const note = await Note.findById(req.params.id);        
        if(!note) return res.status(404).json({message:"Note not found"});
        res.status(200).json(note);
    } catch (error) {
        console.log("Error in getNoteById controller", error);
        res.status(500).json({ message: "Internal Server Error"});
    }   
}


export async function createNotes(req, res) {
    try {
        const { title, content } = req.body;
        const newNote = new Note({ title:title, content: content }) 

        const savedNote = await newNote.save();
        res.status(201).json(savedNote);

    } catch (error) {
        console.log("Error in createNotes controller", error);
        res.status(500).json({ message: "Internal Server Error"});
    }
}
export async function updateNotes(req, res) {
    try {
        const {title, content} = req.body;
        const updateNote = await Note.findByIdAndUpdate(req.params.id, {title, content}, {
            new: true,
        }
    ); 

        if(!updateNote) return res.status(404).json({message:"Note not found"});
        res.status(200).json(updateNote);
    } catch (error) {
        console.log("Error in createNotes controller", error);
        res.status(500).json({ message: "Internal Server Error"});
    }
}

export async function deleteNotes(req, res) {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if(!deletedNote) return res.status(404).json({message:"Note not found"});
        res.status(200).json({message:"Note deleted successfully"});
    }
    catch (error) {
        console.log("Error in deleteNotes controller", error);
        res.status(500).json({ message: "Internal Server Error"});
    }
};
                     


// What is an Endpoint?
// An endpoint is combination of URL + HTTP method that lets a client application to perform operations such as retrieving or sending data (i.e interact with a cetatin resouce).

// app.get("/api/notes", (req, res) => {
//     res.status(200).send("you got 299 notes");
// });

// app.post("/api/notes", (req, res) => {
//     res.status(201).json({message:"post created successfully"});
// });

// app.put("/api/notes/:id", (req, res) => {
//     res.status(200).json({message:"post updated successfully"});
// })

// app.delete("/api/notes/:id", (req, res) => {
//     res.status(200).json({message:"post deleted successfully"});
// })