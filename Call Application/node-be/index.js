const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const ctrl = require('./controllers/triggerCall'); 
const app = express();
const db = require("./models");
const route = require('./routes/route');
const PORT = process.env.PORT || 3001;

app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
)
app.use(logger('dev'));
app.use(express.json());
app.use(route);
app.listen(PORT, () => {
    console.log(`Server Listening on port ${PORT}`);
});

db.sequelize.sync();
(async () => {
    try {
        await db.sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();