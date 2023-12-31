import { openDB } from 'idb';

const initdb = async () =>
// create a new database named 'jate'
openDB('jate', 1, {
    // Add database schema if not already initialized.
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      // Create new object store for data and give it key name of 'id' which will increment automatically.
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// add content to the database
export const putDb = async (content) => {
  console.log('Put to the database');

  // Create a connection to the database database and version we want to use.
  const jateDb = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction('jate', 'readwrite');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .add() method on the store and pass in the content.
  const request = store.put({ id: 1, value: content });

  // Get confirmation of the request.
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// get all the content from the database
export const getDb = async () => {
    console.log('GET from the database');
    // Create a connection to the database database and version we want to use.
    const jateDb = await openDB('jate', 1);

    // Create a new transaction and specify the database and data privileges.
    const tx = jateDb.transaction('jate', 'readonly');
  
    // Open up the desired object store.
    const store = tx.objectStore('jate');
  
    // Use the .get() method to get all data in the database.
    const request = store.get(1);
  
    // Get confirmation of the request.
    const result = await request;
    console.log('result.value', result);
    return result?.value
};

initdb();
