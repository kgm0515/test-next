/*
 * @Description:
 * @Version: 2.0
 * @Autor: 匡光淼
 * @Date: 2022-07-28 08:11:00
 * @LastEditors: 匡光淼
 * @LastEditTime: 2022-07-28 20:48:32
 */
import { MongoClient } from 'mongodb'

async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, name, message } = req.body

    if (!email || !email.includes('@') || !name || name.trim() === '' || !message || message.trim() === '') {
      res.status(422).json({ message: 'Invalid input.' })
      return
    }

    const newMessage = { email, name, message }
    let client
    // const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.ntrwp.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`
    const connectionString = new MongoClient(
      `mongodb://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_ip}:${process.env.mongodb_port}/${process.env.mongodb_database}`
    )

    try {
      client = await connectionString.connect()
    } catch (error) {
      res.status(500).json({ message: 'Could not connect to database.' })
      return
    }

    const db = client.db()

    try {
      const result = await db.collection('messages').insertOne(newMessage)
      newMessage.id = result.insertedId
    } catch (error) {
      client.close()
      res.status(500).json({ message: 'Storing message failed!' })
      return
    }

    client.close()

    res.status(201).json({ message: 'Successfully stored message!', message: newMessage })
  }
}

export default handler
