import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core'
import { Token } from '../token/token'

export const httpTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(Token);
  const token = tokenService.token;
  console.log('token res: ==>', token);
if(token) {
  const clonedReq = req.clone({
  setHeaders : {
  Authorization: `Bearer ${token}`
  }
  });
  return next(clonedReq);
}

  return next(req);
};
