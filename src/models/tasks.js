const mongoose = require('mongoose')
const validate = require('mongoose-validator');

var nameValidator = [
    validate({
      validator: 'isAlphanumeric',
      passIfEmpty: true,
      message: 'should contain alpha-numeric characters only'
    })
  ];

const taskSchema = mongoose.Schema({ 
    description: {
        type: String,
        required: true,
        trim: true,
        maxLength: 140,
        validate: nameValidator
    },
    completed: {
        type: Boolean,
        required: false
    }
}, {
    timestamps: true
})

const Tasks = mongoose.model('Tasks', taskSchema)

module.exports = Tasks