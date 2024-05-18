import http from "http";
import url from "url";
import { loadContacts, CONTACTS_LIST_FILE_PATH, formatContactsList } from "./services.js";

const contactsList = [];

const server = http.createServer((req, res) => {
  const urlData = url.parse(req.url, true);

  console.log(req.method, req.url);

  let responseData = null

  if (urlData.query.format == "true") {
    res.setHeader("Content-Type", "text/html");
    responseData = formatContactsList(contactsList)
  } else {
    responseData = JSON.stringify(contactsList)
    res.setHeader("Content-Type", "application/json");
  }

  res.writeHead(200);
  res.write(JSON.stringify(responseData));

  res.end();
});

async function main() {
  const loadedContacts = await loadContacts();

  contactsList.push(...loadedContacts);
  server.listen(8080, () => {
    console.log("Server is runnig on port 8080");
  });

  // await help();
}

main();
