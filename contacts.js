const fs = require("fs/promises");

const path = require("path");

const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

// Read all contacts with contacts.json
async function listContacts() {
  const allContacts = await fs.readFile(contactsPath);
  return JSON.parse(allContacts);
}

// Read the contact by ID
async function getContactById(contactId) {
  const allContacts = await listContacts();
  const contact = allContacts.find((item) => item.id === contactId);
  return contact || null;
}

// Add new contact
async function addContact(name, email, phone) {
  const allContacts = await listContacts();

  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact;
}

// Read contact by ID and change it
async function editContact(contactId, name, email, phone) {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((item) => item.id === contactId);

  if (index === -1) {
    return null;
  }

  allContacts[index] = {
    id: contactId,
    name,
    email,
    phone,
  };

  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return allContacts[index];
}

// Read contact by ID and delete it
async function removeContact(contactId) {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }

  const [result] = allContacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return result;
}

const contacts = {
  listContacts,
  getContactById,
  addContact,
  editContact,
  removeContact,
};

module.exports = contacts;
