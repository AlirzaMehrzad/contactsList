export const CONTACTS_LIST_FILE_PATH = './data/contacts-list.json';
import fs from 'fs/promises';

export async function loadContacts() {
    try {
        const contactsListJSON = await fs.readFile(CONTACTS_LIST_FILE_PATH, 'utf-8');
       return JSON.parse(contactsListJSON)
    } catch (error) {
        throw error;
    }
}


export function formatContactsList(contactsList) {
    return contactsList
        .map(({ id, firstName, lastName }) => `#${id} ${firstName} ${lastName}`)
        .join('\n');
}

export async function saveContacts(contactsList) {
    try {
        const contactsListJSON = JSON.stringify(contactsList);
        await fs.writeFile(CONTACTS_LIST_FILE_PATH, contactsListJSON);
    } catch (error) {
        throw error;
    }
}

export function generateNewContactId(contactsList){
    const latestContact = contactsList[contactsList.length - 1]
    const id = latestContact ? latestContact.id + 1 : 0

    return id
}
