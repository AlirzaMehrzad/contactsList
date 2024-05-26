import express from 'express'
import routes from './routes/contacts.js'
import bodyParser from 'body-parser';
import { sequelize } from '../models/index.js';
import loggerMidddleware from './middlewares/logger.js';
import configs from '../configs/server.js'
import dotenv from 'dotenv'

dotenv.config()
console.log("eeenv", typeof process.env.DB_PASSWORD)
try{
  await sequelize.sync({ alter: true })
  console.log("All models were synchronized successfully")
}catch(error){
  console.log(('Error in syncing models', error))
}

const app = express();


app.disable('etag')
app.use(bodyParser.urlencoded({extended: false}))
app.use(loggerMidddleware)
app.use('/contacts', routes)

app.listen(configs.port, () => {
    console.log("Express server is runnig on port 8080");
});


