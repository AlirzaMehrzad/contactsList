import { Contact } from '../../models/index.js'
import { formatContactsList} from '../../utils.js';


export async function getContacts(req, res) {
        try {
            const contacts = await Contact.findAll();
            if(req.query.format){
                const responseData = `<pre>${formatContactsList(contacts)}</pre>`;
                res.type('html')
                res.send(responseData)
                return
              }
              res.json(contacts)
    
        } catch (error) {
            res.status(500).send({
                message: 'something went wrong'
            })
        }
}

export async function createContact(req, res){
        const { firstName, lastName, mobilePhone, isFavorite} = req.body;
        try {
         const {id} = await Contact.create({
                firstName,
                lastName,
                mobilePhone,
                isFavorite
         });
         res.send(`The contact "#${id} ${firstName} ${lastName}" added !`)
        } catch (error) {
            res.status(400).send({
                message: 'Wrong input'
            })
        }
}

export async function deleteContact(req, res){
        try {
            await Contact.destroy({
                where: {id: req.params.id}
            })
    
            res.status(200).send({
                message: `contact #${req.params.id} deleted`
            })
        } catch (error) {
            res.status(400).send({
                message: 'There is no contact on database'
            })
        }
}

export async function updateContact(req, res){
        const { firstName, lastName, mobilePhone, isFavorite} = req.body;
        try {
            await Contact.update({
                firstName, 
                lastName, 
                mobilePhone, 
                isFavorite
            },{
                where: { id: req.params.id}
            })
    
            res.status(200).send({
                message: `contact #${req.params.id} updated`
            })
        } catch (error) {
            res.status(400).send({
                message: 'There is no contact on the list'
            })
        }
}