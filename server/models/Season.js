const { Schema, model } = require('mongoose');

const seasonSchema = new Schema ({
    labels: {
        type: Array
    },
    standings: {
        type: Array
    }
})

const Season = model('Season', seasonSchema)
module.exports = Season