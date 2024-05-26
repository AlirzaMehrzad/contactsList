import express from 'express'
import { formatContactsList, loadContacts, generateNewContactId, saveContacts} from '../services.js';
import query from '../db.js'
const router = express.Router()

const contactsList = [];


router.get('/list', async (req,res) =>{
    const contactListDB = await query('SELECT * FROM contacts')
    if(req.query.format){
      const responseData = `<pre>${formatContactsList(contactListDB.rows)}</pre>`;
      res.type('html')
      res.send(responseData)
      return
    }
  
    res.json(contactListDB.rows)
})

router.post('/new', (req, res) =>{
    const { firstName, lastName} = req.body

    const id = generateNewContactId(contactsList)

    const newContact = {
        id,
        firstName,
        lastName
    };
    contactsList.push(newContact);
    saveContacts(contactsList);

    res.send(`The contact "#${id} ${firstName} ${lastName}" added !`)
})

router.delete('/delete/:id', (req, res) =>{
    if (contactsList.length < 1) {
        res.status(400).send({
            message: 'There is no contact on the list'
        })
        return;
    }

    const contactINdex = contactsList.findIndex(({ id }) => id === Number(req.params.id))

    if(contactINdex < 0){
      res.status(400).send({
        message: 'Invalid ID'
       })
       return;
    }

    contactsList.splice(contactINdex, 1)
    saveContacts(contactsList)
    res.status(200).send({
        message: `contact #${req.params.id} deleted`
    })
})

router.put('/update/:id', (req, res) =>{
    if (contactsList.length < 1) {
        res.status(400).send({
            message: 'There is no contact on the list'
        })
        return;
    }

    const contactINdex = contactsList.findIndex(({ id }) => id === Number(req.params.id))

    if(contactINdex < 0){
      res.status(400).send({
        message: 'Invalid ID'
       })
       return;
    }

    const contact = contactsList[contactINdex]
    const updatedContact = {
        ...contact,
        firstName: req.body.firstName || contact.firstName,
        lastName: req.body.lastName || contact.lastName
    }

    contactsList.splice(contactINdex, 1, updatedContact)
    saveContacts(contactsList)

    res.status(200).send({
        message: `contact #${req.params.id} updated`
    })
})


const loadedContacts = await loadContacts();
contactsList.push(...loadedContacts);

export default router