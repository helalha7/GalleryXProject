import clientPromise from './mongodb';
import { ObjectId } from 'mongodb';

/**
 * Gets a reference to a MongoDB collection
 * @param {string} collectionName - Name of the collection
 * @returns {Promise<Collection>} MongoDB collection
 */
export async function getCollection(collectionName) {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB_NAME);
  return db.collection(collectionName);
}

/**
 * Get all documents from a collection
 * @param {string} collectionName - Name of the collection
 * @param {Object} query - Query parameters (optional)
 * @param {Object} options - Options like sort, limit (optional)
 * @returns {Promise<Array>} Array of documents
 */
export async function getDocuments(collectionName, query = {}, options = {}) {
  const collection = await getCollection(collectionName);
  
  const { sort, limit, skip } = options;
  let cursor = collection.find(query);
  
  if (sort) cursor = cursor.sort(sort);
  if (limit) cursor = cursor.limit(limit);
  if (skip) cursor = cursor.skip(skip);
  
  return await cursor.toArray();
}

/**
 * Get a document by ID
 * @param {string} collectionName - Name of the collection
 * @param {string} id - Document ID
 * @returns {Promise<Object>} Document object
 */
export async function getDocumentById(collectionName, id) {
  const collection = await getCollection(collectionName);
  try {
    return await collection.findOne({ _id: new ObjectId(id) });
  } catch (error) {
    console.error(`Error getting document by ID: ${error.message}`);
    return null;
  }
}

/**
 * Create a new document
 * @param {string} collectionName - Name of the collection
 * @param {Object} data - Document data
 * @returns {Promise<Object>} Result of the insertion
 */
export async function createDocument(collectionName, data) {
  const collection = await getCollection(collectionName);
  return await collection.insertOne(data);
}

/**
 * Update a document
 * @param {string} collectionName - Name of the collection
 * @param {string} id - Document ID
 * @param {Object} data - Updated data
 * @returns {Promise<Object>} Result of the update
 */
export async function updateDocument(collectionName, id, data) {
  const collection = await getCollection(collectionName);
  return await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: data }
  );
}

/**
 * Delete a document
 * @param {string} collectionName - Name of the collection
 * @param {string} id - Document ID
 * @returns {Promise<Object>} Result of the deletion
 */
export async function deleteDocument(collectionName, id) {
  const collection = await getCollection(collectionName);
  return await collection.deleteOne({ _id: new ObjectId(id) });
}

/**
 * Count documents in a collection
 * @param {string} collectionName - Name of the collection
 * @param {Object} query - Query parameters (optional)
 * @returns {Promise<number>} Count of documents
 */
export async function countDocuments(collectionName, query = {}) {
  const collection = await getCollection(collectionName);
  return await collection.countDocuments(query);
}

/**
 * Increment a numeric field in a document
 * @param {string} collectionName - Name of the collection
 * @param {string} id - Document ID
 * @param {string} field - Field to increment
 * @param {number} amount - Amount to increment by (default: 1)
 * @returns {Promise<Object>} Result of the update
 */
export async function incrementField(collectionName, id, field, amount = 1) {
  const collection = await getCollection(collectionName);
  return await collection.updateOne(
    { _id: new ObjectId(id) },
    { $inc: { [field]: amount } }
  );
}