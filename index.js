const process = require("process");
const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();
const contactsOperation = require("./db/contacts");

(async () => {
  await invokeAction(argv);
})();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await contactsOperation.listContacts();
      console.table(contacts);
      break;

    case "get":
      const contact = await contactsOperation.getContactById(id);
      if (!contact) {
        throw new Error(`Contact ${id} not found`);
      }
      console.table(contact);
      break;

    case "add":
      const newContact = await contactsOperation.addContact(name, email, phone);
      console.table(newContact);
      break;

    case "remove":
      const remove = await contactsOperation.removeContact(name, id);
      console.table(remove);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

// invokeAction(argv);
