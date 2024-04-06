import readline from 'readline';
import { stdin as input, stdout as output } from "process";
import fs from 'fs/promises';

const CONTACTS_LIST_FILE_PATH = './data/contacts-list.json';

const rl = readline.createInterface({ input, output });
const contactsList = [];

console.log('--- contacts list ----');

async function loadContacts() {
    try {
        const contactsListJSON = await fs.readFile(CONTACTS_LIST_FILE_PATH, 'utf-8');
        contactsList.push(
            ...JSON.parse(contactsListJSON)
        );
    } catch (error) {
        throw error;
    }
}

async function saveContacts() {
    try {
        const contactsListJSON = JSON.stringify(contactsList);
        await fs.writeFile(CONTACTS_LIST_FILE_PATH, contactsListJSON);
    } catch (error) {
        throw error;
    }
}

async function help() {
    console.log('n: Add new contact\nl: Show contacts list\nq: quit');
    const action = await new Promise((resolve) => {
        rl.question('Enter your input:', (input) => {
            resolve(input);
        });
    });

    if (action === 'n') {
        await addNewContact();
    } else if (action === 'l') {
        showContactsList();
    } else {
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

    const newContact = {
        id: contactsList.length,
        firstName,
        lastName
    };
    contactsList.push(newContact);
    await saveContacts();
}

function showContactsList() {
    const formattedContactsList = contactsList
        .map(({ id, firstName, lastName }) => `#${id} ${firstName} ${lastName}`)
        .join('\n');

    console.log('Contacts List:');
    console.log(formattedContactsList);
}

function quit() {
    rl.close();
}

async function main() {
    await loadContacts();
    await help();
}

main();
