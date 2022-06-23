import { AppDataSource } from "./data-source";
import { app } from ".";

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Pagar.me Backend Challenge\n\nServer running on port ${PORT}.`
      );
    });
  })
  .catch((error) => console.log(error));
