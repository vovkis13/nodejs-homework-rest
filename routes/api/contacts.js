const express = require('express');
const router = express.Router();

const { schemaAdd, schemaEdit } = require('./contacts-schemas');
const { validateContact } = require('../../middlewares/validation');
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts');

router.get('/', async (req, res) => {
  res.json(await listContacts());
});

router.get('/:contactId', async (req, res) => {
  const contact = await getContactById(req.params.contactId);
  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ message: 'Contact not found' });
  }
});

router.post('/', validateContact(schemaAdd), async ({ body }, res) => {
  res.status(201).json(await addContact(body));
});

router.delete('/:contactId', async (req, res) => {
  console.log(req.params.contactId);
  const contact = await removeContact(req.params.contactId);
  if (contact) {
    res.json({ message: 'Contact deleted' });
  } else {
    res.status(404).json({ message: 'Contact not found' });
  }
});

router.put('/:contactId', validateContact(schemaEdit), async (req, res) => {
  const contact = await updateContact(req.params.contactId, req.body);
  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ message: 'Contact not found' });
  }
});

module.exports = router;
