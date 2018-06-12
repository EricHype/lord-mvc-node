var mongoose = require('mongoose');


var weaponSchema = mongoose.Schema({
    name : String,
    diceSides : Number, //4 Sided, 6 Sided, etc
    numberOfDice : Number,
    hitChance : { type: Number, min: 0, max: 100 },
    criticalChance : { type: Number, min: 0, max: 100 },
    purchasePrice : Number,
    sellPrice : Number,
    monsterOnly : Boolean
});

module.exports = mongoose.model('Weapon', weaponSchema);