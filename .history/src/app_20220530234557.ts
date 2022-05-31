var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

import express, { ErrorRequestHandler } from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { AppRoute } from './app.routing';

import { Database } from './database';
import passport from 'passport';
export class App{

  private app = express();

  private route = new AppRoute();
  
  constructor(){
    this.setEnvironment();
    this.setHelmet();
    this.setCors();
    this.setPassport();
    this.registerRoute();
  }

  // ====================================================================
  // @Public Methods
  // ====================================================================

  public bootstrap(): void {
    this.app.listen(process.env.PORT, () => console.log(`API Server is running at port ${process.env.PORT}.`))
  }
// 定义setException 的方法来设置 Exception
  public setException(handler: ErrorRequestHandler): void{
    this.app.use(handler);
  }
  public launchDatabase(): void {
    const database = new Database();
    database.connect();

  }
 // ====================================================================
  // @Private Methods
  // ====================================================================
  
  private setHelmet(): void {
    this.app.use(helmet());
  }
  private setCors(): void {
    this.app.use(cors());
  }
  private setEnvironment():void {
    dotenv.config({ path: path.resolve(__dirname, `./environments/${process.env.NODE_ENV}.env`)})
  }
  private setPassport(): void {
    passport.initialize();
  }

  private registerRoute() {
    this.route = new AppRoute();
    this.app.use('/', this.route.router);
  }




  
  
}






// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));


// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;
