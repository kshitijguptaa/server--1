const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');

router.post('/addEmployee', ctrlUser.addEmployee);
router.get('/getEmpList', ctrlUser.getEmpList);
router.post('/updateEmpDetails', ctrlUser.updateEmpDetails);
router.post('/searchEmp', ctrlUser.searchEmp);
router.post('/deleteEmp', ctrlUser.deleteEmp);
router.post('/profileUpload', ctrlUser.profileUpload);
router.post('/retriveImage', ctrlUser.retriveImage);

module.exports = router;
