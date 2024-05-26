import { Sequelize } from "sequelize";
import ContactModel from './contact.js'
import ContactCategoryModel from './contactCategory.js'

const sequelize = new Sequelize({
    username: 'postgres',
    password: 'admin',
    database: 'contactsList',
    dialect: 'postgres',
    logging: false
})

const Contact = ContactModel(sequelize)
const ContactCategory = ContactCategoryModel(sequelize)

Contact.hasOne(ContactCategory)
ContactCategory.belongsTo(Contact)

export {sequelize}
export {Contact}
export {ContactCategory}