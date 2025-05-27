// Ilya Zeldner
import { MongoClient } from 'mongodb';

// Log the MongoDB connection details for debugging
console.log('MongoDB Connection Setup:');
console.log(`URI: ${process.env.MONGODB_URI}`);
console.log(`DB Name: ${process.env.MONGODB_DB_NAME}`);

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME;

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}
if (!dbName) {
    throw new Error('Please define the MONGODB_DB_NAME environment variable inside .env');
}

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') { 
    // In development mode, we use a global variable so that the MongoClient
    // is not constantly created and closed during hot reloading.
    // This is a good practice because it prevents the MongoClient from 
    // being created multiple times in development mode, which can cause
    // issues with the connection pool.
    if (!global._mongoClientPromise) {
   // If the global variable does not exist, create a new MongoClient
    // and assign it to the global variable.   
    client = new MongoClient(uri);
      global._mongoClientPromise = client.connect()
        .then(client => {
          console.log('MongoDB Connected Successfully!');
          return client;
        })
        .catch(err => {
          console.error('MongoDB Connection Error:', err);
          throw err;
        });
  }
  clientPromise = global._mongoClientPromise; // Use the global variable
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri); 
    clientPromise = client.connect()
      .then(client => {
        console.log('MongoDB Connected Successfully!');
        return client;
      })
      .catch(err => {
        console.error('MongoDB Connection Error:', err);
        throw err;
      });
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;