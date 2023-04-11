const express = require('express');
const app = new express();
const db = require('./models');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const logger = require('morgan');

const PhotosRouter = require('./routes/PhotosRouter');
const CommentsRouter = require('./routes/CommentsRouter');
const UsersRouter = require('./routes/UsersRouter');
const PageRouter = require('./routes/PageRouter');
const UserAuthenticator = require('./middlewares/UserAuthenticator')

//app.use(logger("dev"));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set("view engine", "ejs");

//session handling
app.use(expressSession({secret : "fotoclicks is awesome"}));
app.use(UserAuthenticator.checkLoginSession);

//routes
app.use('/images', PhotosRouter);
app.use('/comments', CommentsRouter);
app.use('/users', UsersRouter);
app.use('/', PageRouter);

//db
const sqlPort = 3306;
db.sequelize
    .sync()
    .then(()=>{
        app.listen(sqlPort, ()=>{
            console.log(`Marida db connection successful - port:${sqlPort}`);
        });
    })
    .catch((error)=>{
        console.error("Unable to connect to the database", error);
    });
//db.sequelize.sync({force:true}).... would dump/empty the tables in the db, useful for clearing test data

//server
const port = 8080;
app.listen(port, () => {   
    console.log(`Photo app initialized on http://localhost:${port}`);
});

