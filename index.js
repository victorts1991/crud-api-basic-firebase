const express = require("express")

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const fs = require('firebase-admin')
const serviceAccount = require('./firebase-admin-sdk-key.json')
fs.initializeApp({
    credential: fs.credential.cert(serviceAccount)
})
const db = fs.firestore()

app.post('/person', async (req, res) => {
    const persons = await db.collection('persons')
    persons.add(req.body)
    res.json({"success": true})
})

app.get('/persons', async (req, res) => {
    const persons = await db.collection('persons').get()
    res.json(persons.docs.map(doc => {
        return { id: doc.id, ...doc.data() }
    }))
})

app.get('/person/:id', async (req, res) => {
    const person = await db.collection('persons').doc(req.params.id).get()
    res.json({
        id: person.id,
        ...person.data()
    })
})

app.put('/person/:id', async (req, res) => {
    await db.collection('persons').doc(req.params.id).update(req.body)
    const person = await db.collection('persons').doc(req.params.id).get()
    res.json({
        id: person.id,
        ...person.data()
    })
})

app.delete('/person/:id', async (req, res) => {
    await db.collection('persons').doc(req.params.id).delete()
    res.json({"success": true})
})

app.listen(3001, () => {
    console.log("Server running on port 3001")
})