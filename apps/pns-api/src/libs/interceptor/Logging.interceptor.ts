import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { log } from 'console';
import { stringify } from 'querystring';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger: Logger = new Logger();

  public intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const recordTime = Date.now();
    const requestType = context.getType<GqlContextType>();

    if (requestType === 'http') {
      // Develop if needed!
    } else if (requestType === 'graphql') {
        //(1) Print Request
      const gqlContext = GqlExecutionContext.create(context);      
      this.logger.log( `${this.stringify(gqlContext.getContext().req.body)}`, 'REQUEST');

      return next.handle().pipe(
        tap((context) => {
          const responseTime = Date.now();
          this.logger.log( `${this.stringify(context)} - ${responseTime  - recordTime}ms \n\n`, 'RESPONSE');
        }),
      );

    }

    return next.handle()

    // (2) Errors handiling via GraphQL

    // (3) No Errors, giving Respons below

   
  }

  private stringify (context: ExecutionContext): string{
    return JSON.stringify(context).slice(0,77)
    
  }
}