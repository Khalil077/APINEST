import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class FirstMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    if (req.path === '/book/all') {
      console.log('Hello hello');
    }
    next();
  }
}
