var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost:27017/quora-apis')
mongoose.connection.on('error', (error) => console.error(error))
mongoose.connection.on('open', () => console.log('successfully connected with mongodb..'))


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

const userController = require('./controllers/users');
const questionController = require('./controllers/question');
const answerController = require('./controllers/answer');



app.get('/api/v1/users', userController.getAllUsers);
app.post('/api/v1/users', userController.postNewUsers);
app.put('/api/v1/users/:id', userController.updateUsersById);
app.delete('/api/v1/users/:id', userController.delUsersById);

app.get('/api/v1/questions', questionController.getAllQuestions);
app.post('/api/v1/questions', questionController.postNewQuestions);
app.put('/api/v1/questions/:id',questionController.updateQuestionById);
app.delete('/api/v1/questions/:id', questionController.delQuestionById);

app.get('/api/v1/answers',answerController.getAllAnswers);
app.post('/api/v1/answers', answerController.postNewAnswer);
app.put('/api/v1/answers/:id', answerController.updateAnswerById);
app.delete('/api/v1/answers/:id', answerController.delAnswerById);

//app.listen(3000, () => console.log('Express server at 3000'))
module.exports = app;
