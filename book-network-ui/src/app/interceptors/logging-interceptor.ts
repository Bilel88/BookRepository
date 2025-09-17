import { HttpInterceptorFn } from '@angular/common/http';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
    console.log('📡 [HTTP Interceptor]');
  console.log('➡️ URL     :', req.url);
  console.log('➡️ Method  :', req.method);
  console.log('➡️ Headers :', req.headers.keys());
  console.log('📦 Body    :', req.body || '⚠️ Aucun body');
  return next(req);
};
