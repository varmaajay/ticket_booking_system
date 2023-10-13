const express = require('express');
const admin_route= new express.Router();
const adminController = require("../controller/admincontroller");
admin_route.get('/',adminController.set_up);
admin_route.post('/',adminController.pass);

admin_route.get('/list',adminController.list_setup);
admin_route.post('/list',adminController.searchData);
admin_route.get('/edit/:id',adminController.editByid);
admin_route.post('/edit/:id',adminController.updateByid);
admin_route.get('/delete/:id',adminController.deleteByid);

module.exports = admin_route;