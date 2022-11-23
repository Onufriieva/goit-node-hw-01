const path = require('path');
const fs = require('fs/promises');
const {v4} = require('uuid');

const contactsPath = path.join(__dirname, "./db/contacts.json");

  async function listContacts() {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  }
  
  async function getContactById(contactId) {
    const contacts = await listContacts();
    const contactById = contacts.find(item => item.id === String(contactId));
    if(!contactById) {
        return null;
    }
    return contactById;
  }
  
  async function removeContact(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === String(contactId));
    if(index === -1) {
        return null;
    }
    const newContacts = contacts.filter((_, id) => id !== index);
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    return contacts[index];
  }
  
  async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = {
        name: name,
        email: email,
        phone: phone,
        id: v4()
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  }


  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
  }