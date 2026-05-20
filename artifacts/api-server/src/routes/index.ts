import { Router, type IRouter } from "express";
import healthRouter from "./health";
import contactRouter from "./contact";
import driverApplicationsRouter from "./driver-applications";

const router: IRouter = Router();

router.use(healthRouter);
router.use(contactRouter);
router.use(driverApplicationsRouter);

export default router;
