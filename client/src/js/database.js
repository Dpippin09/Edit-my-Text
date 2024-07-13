import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (id, content) => {
  console.log("Updated the database with the following content:", content);
  // This function is used to open the database and create a transaction.
  const jateDb = await openDB("jate", 1);
  // This function is used to create a transaction and get the object store.
  const tx = jateDb.transaction("jate", "readwrite");
  // This function is used to pass the object store to the store variable.
  const store = tx.objectStore("jate");
  // This function is passing the store variable to the request variable, and the request variable is used to put the content in the database.
  const request = store.put({ id: id, jate: content });
  const result = await request;
  console.log("Data saved to the database:", result);
};


// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const jateDb = await openDB("jate", 1);
  const tx = jateDb.transaction("jate", "readonly");
  const store = tx.objectStore("jate");
  const request = store.getAll();
  const result = await request;
  console.log("Data retrieved from the database:", result);
  return result;
}

initdb();
