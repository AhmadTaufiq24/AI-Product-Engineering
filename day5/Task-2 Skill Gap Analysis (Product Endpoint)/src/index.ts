import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { skillGapRouter } from './modules/skill-gap/router.js'
import { cors } from 'hono/cors'

const app = new Hono().use(cors({ origin: "http://localhost:3000" }))
  .route('/skill-gap', skillGapRouter)



serve({
  fetch: app.fetch,
  port: 4000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
