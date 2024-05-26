import readline from 'readline';
import { stdin as input, stdout as output } from "process";
import { Contact, sequelize } from '../models/index.js';
import fs from 'fs/promises';
import { formatContactsList } from '../utils.js';

const rl = readline.createInterface({ input, output });
const contactsList = [];

console.log('--- contacts list ----');



async function help() {
    console.log('n: Add new contact\nd: delete a contact\nl: Show contacts list\nq: quit');
    console.log('----------------')
    const action = await new Promise((resolve) => {
        rl.question('Enter your input:', (input) => {
            resolve(input);
        });
    });

    if (action === 'n') {
        await addNewContact();
    } else if (action === 'l') {
        showContactsList();
    }else if (action === 'd'){
        await deleteContact()
    }
     else {
        quit();
    }

    await help();
}

async function addNewContact() {
    const firstName = await new Promise((resolve) => {
        rl.question('First name:', (input) => {
            resolve(input);
        });
    });
    const mobilePhone = await new Promise((resolve) => {
        rl.question('mobilePhone:', (input) => {
            resolve(input);
        });
    });
    const isFavorite = await new Promise((resolve) => {
        rl.question('isFavorite:', (input) => {
            resolve(input);
        });
    });
    const lastName = await new Promise((resolve) => {
        rl.question('Last name:', (input) => {
            resolve(input);
        });
    });

    await Contact.create({
        firstName,
        lastName,
        mobilePhone,
        isFavorite
    });
}

async function deleteContact(){
    await showContactsList()
    const contactId = await new Promise((resolve => {
        rl.question('Delete ID: ', (input) => {
            resolve(input)
        })
    }))

    await Contact.destroy({
        where: {id: contactId}
    })
}

async function showContactsList() {
    const contacts = await Contact.findAll();
    const formattedContactsList = formatContactsList(contacts)

    console.log('Contacts List:');
    console.log(formattedContactsList);
}

function quit() {
    rl.close();
}

async function main() {
    try{
        await sequelize.sync({ force: false })
        console.log("[All models were synchronized successfully]")
        help();
    }catch(error){
        console.log(('Error in syncing models', error))
    }
       
}

main();