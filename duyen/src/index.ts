import express from "express";
import type { Request, Response } from "express";

const app = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Express!");
});

app.post("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express! with POST");
});

// CRUDL: Create, Read, Update, Delete, List
//        POST, GET, PUT/PATCH, DELETE, GET

app.post("/v1/categories", (req: Request, res: Response) => {
  res.send("Create category");
});

app.get("/v1/categories/", (req: Request, res: Response) => {
  res.send("List category");
});

app.get("/v1/categories/:id", (req: Request, res: Response) => {
  res.send("Get category by id");
});

app.patch("/v1/categories/:id", (req: Request, res: Response) => {
  res.send("Update category by id");
});

app.delete("/v1/categories/:id", (req: Request, res: Response) => {
  res.send("Delete category by id");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
