var mongoose = require('mongoose');


var armorSchema = mongoose.Schema({
    name : String,
    defenseRating : Number,
    purchasePrice : Number,
    sellPrice : Number
});

module.exports = mongoose.model('Armor', armorSchema);