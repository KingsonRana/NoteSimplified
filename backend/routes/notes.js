const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const Notes = require("../models/Notes");
const { body, validationResult } = require('express-validator');

//ROUTE1: GET all the notes using GET "/api/notes/fetchallnotes"
router.get('/fetchAllNotes', fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error occured")
    }
})

// ROUTE2 : Add new note using POST "/api/notes/addnote". Login required
router.post('/addNotes', fetchUser, [
    body('title', "Enter a valid title").isLength({ min: 5 }),
    body('description', 'Description should atleast have 5 characters').isLength({ min: 5 })
], async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }

    try {
        const { title, description, tag } = req.body

        const note = new Notes({
            title, description, tag, user: req.user.id
        })

        const saveNote = await note.save()
        res.send(note)
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error occured")
    }
})

// ROUTE 3 : Update an existing note using post but we will use put request. Log in required
router.put('/updateNote/:id', fetchUser, async (req, res) => {
    const {title, description,tag} = req.body;
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag}

    //find note to be updated
    let note = await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("Not found")}

    if(note.user.toString()!=req.user.id){
        return res.status(401).send("Not allowed");
    }
    note = await Notes.findByIdAndUpdate(req.params.id, {$set : newNote},{new:true})
    res.json({note})
}
)

//ROUTE 4 : To delete a note. Log in required
router.delete('/delete/:id',fetchUser,async(req,res)=>{
    let note = await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("Not found")}

    if(note.user.toString()!=req.user.id){
        return res.status(401).send("Not allowed");
    }
    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({"success":"deletion Successfully"})
})







module.exports = router