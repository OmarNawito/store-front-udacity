import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import routes from './routes'

const app: express.Application = express()
const PORT: number =  process.env.PORT as unknown as number || 3020;
const address: string = `0.0.0.0:${PORT}`

app.use(bodyParser.json())
app.use('/api', routes)
app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})
app.use(function (req, res) {
    res.status(404);
    res.send("Page not found");
});

app.listen(PORT, function () {
    console.log(`starting app on: ${address}`)
})