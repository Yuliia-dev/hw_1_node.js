const { program } = require("commander");
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const fs = require("fs/promises");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactsList = await listContacts();
      console.table(contactsList);
      break;

    case "get":
      const contactById = await getContactById(id);
      if (!contactById) {
        throw new Error("Product not found");
      }
      console.log(contactById);
      break;

    case "add":
      const addNewContact = await addContact(name, email, phone);
      console.log(addNewContact);
      break;

    case "remove":
      const removeContactById = await removeContact(id);
      console.log(removeContactById);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

// Функція миттєвого виклику
(async () => {
  await invokeAction(argv);
})();
