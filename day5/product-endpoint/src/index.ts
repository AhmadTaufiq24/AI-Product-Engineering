import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { researchRouter } from './modules/research/router'
import { cors } from 'hono/cors'

const app = new Hono().use(cors({ origin: "http://localhost:3000" }))
  .route('/research', researchRouter)



// app.get('/users', (c) => {
//   return c.json({ message: 'Hello Hono!' })
// })

// app.get('/users/:id', (c) => {
//   const id = c.req.param('id')
//   return c.json({ message: id })
// });

// app.post('/users', (c) => {
//   return c.json({ message: 'User created successfully' })
// });

// app.patch('/users/:id', (c) => {
//   const id = c.req.param('id')
//   return c.json({ message: `User updated successfully: ${id}` })
// });

// app.delete('/users/:id', (c) => {
//   const id = c.req.param('id')
//   return c.json({ message: `User deleted successfully: ${id}` })
// });

serve({
  fetch: app.fetch,
  port: 4000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
