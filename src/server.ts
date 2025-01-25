import { Schematic } from 'mindustry-schematic-parser' // Make sure to install and import the correct package
import bodyParser from 'body-parser'
import express from 'express'

const app = express()
const port = 3000

// Middleware to parse binary body
app.use(bodyParser.raw({ type: 'application/octet-stream', limit: '10mb' }))

app.post('/render', async (req, res) => {
  try {
    const buffer = req.body
    const schematic = Schematic.decode(buffer)

    const image = (await schematic.render()).toBuffer()

    // Assuming you have a renderSchematic function to render the schematic to an image
    // const image = renderSchematic(schematic)

    res.setHeader('Content-Type', 'image/png')
    res.send(image)
  } catch (error) {
    console.error('Error rendering schematic:', error)
    res.status(500).send('Error rendering schematic')
  }
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
