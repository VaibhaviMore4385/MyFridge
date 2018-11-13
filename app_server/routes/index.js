var express = require('express');
var router = express.Router();

var ctrlMain = require('../controllers/foodItems');
var ctrlItemList = require('../controllers/updateFoodList');
var ctrlAddEdit = require('../controllers/food_list');

router.get('/', ctrlMain.index);
router.get('/updateFoodList', ctrlItemList.foodList);
router.get('/food_list', ctrlAddEdit.foodCreate);
router.post('/food_list', ctrlAddEdit.doFoodCreate);


module.exports = router;
