const express = require('express');
const admin_route= new express.Router();
const multer = require('multer')
const adminController = require("../controller/admincontroller");
// const fileUpload= require("express-fileupload");
// admin_route.use(fileUpload());

var storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        console.log(req,"sasa")
        return cb(null,"./upload");
    },

    filename : (req,file,cb)=>{
        console.log(file,"sas")
        return cb(null,file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }

});

// console.log(Storage.getFilename,"sddddd")
// console.log(Storage)
const upload = multer({
    storage:storage
}).single("photo");
admin_route.get('/',adminController.set_up);
admin_route.post('/',upload,adminController.pass);
// admin_route.use('/upload',upload.single('photo'),adminController.pass);

admin_route.get('/list',adminController.list_setup);
admin_route.post('/list',adminController.searchData);
admin_route.get('/edit/:id',adminController.editByid);
admin_route.post('/edit/:id',adminController.updateByid);
admin_route.get('/delete/:id',adminController.deleteByid);

module.exports = admin_route;