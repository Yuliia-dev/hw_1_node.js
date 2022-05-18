const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const allContacts = await listContacts();
  const contactById = allContacts.find(({ id }) => id === contactId);
  if (!contactById) {
    return null;
  }
  return contactById;
}

async function removeContact(contactId) {
  const allContacts = await listContacts();
  const indexContact = allContacts.findIndex((item) => item.id === contactId);
  if (indexContact === -1) {
    return null;
  }
  const contactById = allContacts.filter((_, index) => index !== indexContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactById));
  return allContacts[indexContact];
}

async function addContact(name, email, phone) {
  const allContacts = await listContacts();
  const newContact = { id: v4(), name, email, phone };
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  return newContact;
}

module.exports = { listContacts, getContactById, addContact, removeContact };
