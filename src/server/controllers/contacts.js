import { Sequelize } from 'sequelize';
import { Contact } from '../../models/index.js'
import { formatContactsList} from '../../utils.js';
import multer from 'multer'

const upload = multer({ storage: multer.memoryStorage() })

async function loadContacts(req, res, next){
    try {
        const { sort, desc, q } = req.query;
        const order = []
        const where = {}
        if (q) {
            where[Sequelize.Op.or] = [
                { firstName: { [Sequelize.Op.like]: `%${q}%` } },
                { lastName: { [Sequelize.Op.like]: `%${q}%` } },
                { mobilePhone: { [Sequelize.Op.like]: `%${q}%` } },
            ];
        }    

        if(sort){
            order.push([sort, desc === 'true' ? 'DESC' : 'ASC'])
        }
        const contacts = await Contact.findAll({
            where,
            order,
        });
        
        req.locals = {
            contacts
        }
        next();
    } catch (error) {
        res.status(500).send({
            message: 'something went wrong in loadContacts'
        })
    }
}

async function getContactsFormatted(req, res, next){
    if(req.query.format !== 'true'){
        return next()
    }
    const {contacts} = req.locals
    const responseData = `<pre>${formatContactsList(contacts)}</pre>`;
    res.type('html')
    res.send(responseData)
}

async function getContactsCtl(req, res) {
    const {contacts} = req.locals
    const normalizedContacts = contacts.map(({dataValues: { id, profilePicture, ...rest}}) =>({
        id,
        profilePicture: profilePicture ? `/images/profile-picture/${id}` : null,
        ...rest
        }));

    res.json(normalizedContacts) 
};

export const getContacts = [
    loadContacts,
    getContactsFormatted,
    getContactsCtl
]



export async function getContactProfilePicture(req, res){
    try {
        const { profilePicture } = await Contact.findOne({
            attributes: ['profilePicture'],
            where: { id: req.params.id}
        })
    
        res.type('image/jpeg');
        res.send(profilePicture)
    } catch (error) {
        res.status(500).send({
            message: 'Wrong input'
        })
    }

}

export async function createContactCtl(req, res){
        const { firstName, lastName, mobilePhone, isFavorite} = req.body;
        const { buffer: profilePicture } = req.file
        try {
         const {id} = await Contact.create({
                firstName,
                lastName,
                mobilePhone,
                isFavorite,
                profilePicture
         });
         res.send(`The contact "#${id} ${firstName} ${lastName}" added !`)
        } catch (error) {
            res.status(400).send({
                message: 'Wrong input'
            })
        }
};

export const createContact = [
    upload.single('profilePicture'),
    createContactCtl
 ]
    

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
};

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
};


