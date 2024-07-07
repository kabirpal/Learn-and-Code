import { Request, Response, Router } from 'express';
import express = require('express');
import { userSignupController } from "../controllers/userSignupController";
import { userLoginController } from "../controllers/userLoginController";

class RouteHandler {
    private router: Router;
    private userSignupController: userSignupController;
    private userLoginController: userLoginController;
    
    constructor() {
        this.router = express.Router();
        this.userSignupController = new userSignupController();
        this.userLoginController = new userLoginController();
        this.setupRoutes();
    }

    private redirectToIndexPage(req: Request, res: Response): void {
        res.redirect('index.html');
    }

    private setupRoutes(): void {
        this.router.post("/login", this.userLoginController.login);
        this.router.post("/sign_up", this.userSignupController.signUp);
        this.router.get("/", this.redirectToIndexPage);
    }

    public getRouter(): Router {
        return this.router;
    }
}

export default new RouteHandler().getRouter();
