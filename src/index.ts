import 'dotenv/config'
import express from 'express'
import router from './routes'
import swaggerUi from 'swagger-ui-express'
import swaggerOutput from './config/swagger_output.json'

const app = express()
const PORT = process.env.PORT ?? 3001

app.use(express.json())
app.use('/api', router)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput as swaggerUi.JsonObject))

app.get('/', (req, res) => {
    res.send('HELLOOOO')
})

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}

export default app
