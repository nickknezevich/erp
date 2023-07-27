import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  import { v4 as uuidV4 } from 'uuid';
  
  export interface Response<T> {
    version: string;
    id: string;
    code: number;
    message: string;
    data: T;
  }
  
  @Injectable()
  export class ApiResponseInterceptor<T>
    implements NestInterceptor<T, Response<T>>
  {
    intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Observable<Response<T>> {
      if (context.getType() === 'http') {
        return next.handle().pipe(
          map((data) => ({
            version: '1.0', 
            id: uuidV4(),
            code: context.switchToHttp().getResponse().statusCode,
            message: 'Success',
            data
          })),
        );
      }
    }
  }