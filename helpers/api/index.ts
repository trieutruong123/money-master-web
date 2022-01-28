import { errorHandler } from './error-handler';
import { apiHandler } from './api-handler';
import { omit } from './omit';


export const responseHandler:any = {
    apiHandler, 
    errorHandler,
    omit,
}

