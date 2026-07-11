
// const username: string = "Randy";

// let firstname: "Randy";

// interface User {
//   id: string;
//   name: string;
//   age: string;
//   isStudent: string;
// }

// const newUser: User = {
//   id: "dwd",
//   name: "Najwa",
//   age: "25",
//   isStudent: "false",
// };

// interface Config {
//   appName: string;
//   appVersion: string;
//   appPort: number;
//   appEnvironment: string;
// };

// const config: Config = {
//   appName: "My App",
//   appVersion: "1.0.0",
//   appPort: 3000,
//   appEnvironment: "development",
// };
// 
// 
// const article = await readFile("data/article.txt", { encoding: "utf-8" });
// console.log(article);

import { input } from "@inquirer/prompts";
import { z } from "zod";

const UserSchema = z.object({
  username: z.string().min(8),
});

const username = await input({
  message: "Enter your username: ",
})

// Validation
const validation = UserSchema.safeParse({
  username,
})

if (!validation.success) {
  console.log("ERROR: Data tidak sesuai!!");
} else {
  console.log("SUCCESS: ", validation.data);
}



