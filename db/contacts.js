const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");
console.log(__dirname);

const contactsPath = path.join(__dirname, "contacts.json");
const updateProducts = async (data) =>
  await fs.writeFile(contactsPath, JSON.stringify(data));

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  console.log(contacts);
  return contacts;
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  const contact = data.find((contact) => contact.id === contactId);
  return contact;
};

const removeContact = async (name, contactId) => {
  const data = await listContacts();
  const idx = data.findIndex((contact) => contact.id === contactId);
  if (idx === -1) {
    return null;
  }
  const [removeId] = data.splice(idx, 1);
  await updateProducts(data);
  return removeId;
};

const addContact = async (name, email, phone) => {
  const data = await listContacts();
  const newContact = { id: v4(), name, email, phone };
  data.push(newContact);
  await updateProducts(data);
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
