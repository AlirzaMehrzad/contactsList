import express from 'express'
import url from "url";
import { loadContacts, CONTACTS_LIST_FILE_PATH, formatContactsList } from "./services.js";

const app = express();

const contactsList = [];

function loggerMidddleware(req, res, next) {
  console.log('Request:', req.method, req.url);
  next()
}

app.disable('etag')
app.use(loggerMidddleware)

app.get('/list', (req,res) =>{
  if(req.query.format){
    const responseData = `<pre>${formatContactsList(contactsList)}</pre>`;
    res.type('html')
    res.send(responseData)
    return
  }

  res.json(contactsList)
})

async function main() {
  const loadedContacts = await loadContacts();

  contactsList.push(...loadedContacts);
  app.listen(8080, () => {
    console.log("Express server is runnig on port 8080");
  });

  // await help();
}

await main();
