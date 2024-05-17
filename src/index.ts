import { Hono } from "hono";
import { handle } from "hono/aws-lambda";
import { logger } from "hono/logger";
import { basicAuth } from 'hono/basic-auth'
import dotenv from 'dotenv';

dotenv.config();

const app = new Hono();

app.use("*", logger());
app.use(
  '/*',
  basicAuth({
    username: process.env.BASIC_AUTH_USERNAME!,
    password: process.env.BASIC_AUTH_PASSWORD!,
  })
)

app.get('/', async (c) => {
	return c.json({ status: 'OK' }, 200)
})

export const handler = handle(app);
