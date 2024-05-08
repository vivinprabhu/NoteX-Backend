const router = require('express').Router();

const { User } = require('../model/user');

const auth = require('../role/auth')
const roleCheck = require('../role/roleCheck')


const noteModel = require('../model/note');
const { cookieJwtAuth } = require('../routes/verifyToken')

router.get("/getNotes", async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate("notes");
        res.json(user.notes); 
    } catch (error) {
        res.status(500).send({message:"Internal server error"});
    }
})

router.post("/createNotes", cookieJwtAuth, async (req, res) => {
    try {
        const newNote = await noteModel.create({...req.body , user : req.user._id});
        await User.findByIdAndUpdate(req.user._id,{$push:{notes: newNote._id}});
        res.json(newNote);        
    } catch (error) {
        res.status(500).send({message:"Internal server error"});
    }
})

router.get("/getNote/:id", auth , roleCheck("user"), cookieJwtAuth, async (req, res) => {
    const id = req.params.id;
    noteModel.findById(id)
        .then(note => res.json(note))
        .catch(err => res.json(err))
})

router.put("/updateNote/:id", auth , roleCheck("user"), cookieJwtAuth, async (req, res) => {
    const id = req.params.id;
    noteModel.findByIdAndUpdate(id, req.body)
        .then(note => res.json(note))
        .catch(err => res.json(err))
})

router.delete("/deleteNote/:id", auth , roleCheck("user"), async (req, res) => {
    const id = req.params.id;
    try {
        const deleteNote = await noteModel.findByIdAndDelete(id);
        await User.findByIdAndUpdate(req.user._id,{$pull : {notes:id}})
        res.json("Deleted successfully");
    } catch (error) {
        res.status(500).send({message:"Internal server error"});
    }
})

module.exports = router