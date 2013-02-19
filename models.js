var mongoose = require('mongoose');

mongoose.connect(process.env.MONGOLAB_URI||'mongodb://localhost/todoers');
//mongoose.connect('mongodb://localhost/todoers');

var userSchema = mongoose.Schema({
    username: String,
    color: String,
    //dayList: {type: mongoose.Schema.Types.ObjectId, ref: 'Day'},
    taskList: Array,
    gifList: Array
});

var daySchema = mongoose.Schema({
    taskList: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
    date: String
});

var taskSchema = mongoose.Schema({
    keyword: String,
    link: String
});

var User = mongoose.model('User', userSchema);
var Day = mongoose.model('Day', daySchema);
var Task = mongoose.model('Task', taskSchema);

exports.User = User;
exports.Day = Day;
exports.Task = Task;