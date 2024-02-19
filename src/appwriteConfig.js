import { Client, Databases } from 'appwrite';

const client = new Client();

export const PROJECT_ID = import.meta.env.PROJECT_ID
export const DATABASE_ID = '65d1f3185fce9cb65f1f'
export const COLLECTION_ID = '65d1f33d0de8172c7af5'

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('65d1ed28e6ed7dcd1560');

export const databases = new Databases(client)

const promise = databases.createDocument(DATABASE_ID, COLLECTION_ID, '', {  })

export default client