const fs = require('fs/promises');
const path = require('path');
const { v4 } = require('uuid');

const contactsPath = path.join(__dirname, './contacts.json');

const listContacts = async () => {
  try {
    return JSON.parse(await fs.readFile(contactsPath));
  } catch (err) {
    return err.message;
  }
};

const getContactById = async contactId => {
  try {
    const foundContact = JSON.parse(await fs.readFile(contactsPath)).find(
      contact => contact.id === contactId,
    );
    if (foundContact) {
      return foundContact;
    }
    return false;
  } catch (err) {
    return err.message;
  }
};

const removeContact = async contactId => {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath));
    const index = contacts.findIndex(contact => contact.id === contactId);
    if (index >= 0) {
      const deletedContact = contacts.splice(index, 1);
      fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      return deletedContact;
    }
    return null;
  } catch (err) {
    return err.message;
  }
};

const addContact = async body => {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath));
    contacts.push({ id: v4(), ...body });
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  } catch (err) {
    return err.message;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath));
    const index = contacts.findIndex(contact => contact.id === contactId);
    if (index >= 0) {
      contacts[index] = { ...contacts[index], ...body };
      fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      return contacts[index];
    }
    return null;
  } catch (err) {
    return err.message;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
