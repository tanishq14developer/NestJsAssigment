import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { Injectable, Logger } from '@nestjs/common';
import { finalize } from 'rxjs';

import { ContextProvider } from './../providers/context.provider';
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private logger = new Logger();

  intercept(context: ExecutionContext, next: CallHandler) {
    const now = Date.now();

    return next.handle().pipe(
      finalize(() => {
        const { id, url, method, query, body } = context
          .switchToHttp()
          .getRequest();
        const user = ContextProvider.getAuthUser();
        const userId = user ? user.id : '-1';
        this.logger.log(
          `${id} ${userId} ${url} ${method} ${JSON.stringify(
            query,
          )} ${JSON.stringify(body)} ${Date.now() - now}ms`,
        );
      }),
    );
  }
}
