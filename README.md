# Elysia Drizzle Schema

Simple [Elysia.js](https://elysiajs.com) plugin that helps to use [Drizzle ORM](https://orm.drizzle.team/) schema inside elysia swagger [model](https://elysiajs.com/validation/reference-model.html#reference-model).

> [!NOTE]
> Only Postgresql (via pg-core) was supported now

## Requirements

- bun
- Drizzle ORM
- Elysia.js

## Usage

```ts
import { foo } from "../db/schema";
import { parseDrizzleModel } from "./elysia-drizzle";

const app = new Elysia();

app
  .use(swagger())
  .model({
    foo: parseDrizzleModel(foo, { exludedColumns: ["id", "uuid"] }),
  })
  .put("/", requestController.insert, {
    body: "test",
    detail: {
      summary: "Insert new entity",
    },
  })
  .listener(3000);
```
