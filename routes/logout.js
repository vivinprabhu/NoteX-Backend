const router = require('express').Router();

router.get('/deleteCookie' , (req,res)=>{
    res.status(202).clearCookie('token').send('Loggedout successfully')
})

module.exports = router;