var mongoose = require('mongoose');
var weaponSchema = require('./weapon').Schema;
var armorSchema = require('./armor').Schema;

var characterSchema = mongoose.Schema({
    userId        : { type: mongoose.Schema.Types.ObjectId, ref:'User'},
    name : {type : String, required : true },
    classType : String,
    maxHp : Number,
    maxKnightSpecials : 0,
    maxMP : 0,
    maxThiefSpecials : 0,
    weapon : weaponSchema,
    armor : armorSchema,
    level : { type: Number, min: 1, max: 12, default : 1, required : true },
    dragonKills : { type: Number, default: 0 }
});