import readline from 'readline';
import { stdin as input, stdout as output } from "process";
import fs from 'fs/promises';
import { loadContacts,
         saveContacts,
         generateNewContactId,
         formatContactsList,  
         CONTACTS_LIST_FILE_PATH} from './services.js';

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
    const lastName = await new Promise((resolve) => {
        rl.question('Last name:', (input) => {
            resolve(input);
        });
    });

    const id = generateNewContactId(contactsList)

    const newContact = {
        id,
        firstName,
        lastName
    };
    contactsList.push(newContact);
    saveContacts(contactsList);
}

async function deleteContact(){
    if (contactsList.length < 1) {
        console.error("There is no contactc to delete")
    }

    showContactsList()

    const contactId = await new Promise((resolve => {
        rl.question('Delete ID: ', (input) => {
            resolve(input)
        })
    }))

    const contactINdex = contactsList.findIndex(({ id }) => id === Number(contactId))

    if(contactINdex < 0) console.error('Invalid ID.')

    contactsList.splice(contactINdex, 1)
    saveContacts(contactsList)
}

function showContactsList() {
    const formattedContactsList = formatContactsList(contactsList)

    console.log('Contacts List:');
    console.log(formattedContactsList);
}

function quit() {
    rl.close();
}

async function main() {
    const loadedContacts = await loadContacts();
    contactsList.push(
        ...loadedContacts
    )
    await help();
}

main();