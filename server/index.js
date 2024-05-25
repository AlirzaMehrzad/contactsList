import express from 'express'
import routes from './routes.js'
import bodyParser from 'body-parser';
const app = express();


function loggerMidddleware(req, res, next) {
  console.log('Request:', req.method, req.url);
  next()
}

app.disable('etag')
app.use(bodyParser.urlencoded({extended: false}))
app.use(loggerMidddleware)
app.use('/contacts', routes)



app.listen(8080, () => {
    console.log("Express server is runnig on port 8080");
  });


