import { Express, Request, Response } from "express";
import { customer as customerRoutes } from "./customer.routes";

const routes = (app: Express) => {
  app.use("/customer", customerRoutes);

  app.all("*", (_: Request, res: Response) => {
    return res.status(404).json({
      error: "Not found.",
    });
  });
};

export default routes;
