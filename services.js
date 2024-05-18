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
