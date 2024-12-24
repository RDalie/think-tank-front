import { Client, Account } from 'appwrite'

export const client = new Client()

client.setEndpoint('http://appwrite.local/v1').setProject('676b223200093cde9fd8')

export const account = new Account(client)
export { ID } from 'appwrite'
