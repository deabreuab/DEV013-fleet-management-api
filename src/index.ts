import 'dotenv/config'
import express from 'express'
import router from './routes'
const app = express()
const PORT = process.env.PORT ?? 3001

app.use(express.json())
app.use('/api', router)

app.get('/', (req, res) => {
    res.send('HELLOOOO')
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
