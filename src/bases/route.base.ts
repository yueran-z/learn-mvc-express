import { Router, Request, Response, NextFunction } from 'express';
import { ControllerBase } from './controller.base';

import { HttpStatus } from '../types/response.type';

import { ResponseObject } from '../common/response/response.object';

// 把Controller 回传的物件都设为ResponseObject，从里面送出/拿到回传的资讯
export abstract class RouteBase {

    public router = Router();

    protected controller!: ControllerBase;

    constructor() {
        this.initial();
    }

    protected initial(): void {
        this.registerRoute();
    }

    protected abstract registerRoute(): void;

    // 所有controller方法都加上responseHandler
    protected responseHandler(method:(req: Request, res: Response, next: NextFunction) => Promise<ResponseObject>, controller = this.controller){
        return (req: Request, res: Response, next: NextFunction) =>{
            method.call(this.controller,req,res,next)
            .then(obj => res.status(obj.status).json(obj))
            .catch((err: Error) => next(controller.formatResponse(err.message, (err as any).status || HttpStatus.INTERNAL_ERROR)));
        }
    }

}
