import express from 'express'
import { createContact, deleteContact, getContacts, updateContact } from '../controllers/contacts.js';
const router = express.Router()



router.get('/list', getContacts)

router.post('/new', createContact)

router.delete('/delete/:id', deleteContact)

router.put('/update/:id', updateContact)


export default router