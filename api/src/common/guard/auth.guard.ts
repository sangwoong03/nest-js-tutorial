import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    
    // if validateToken method return false, it will return 403 Forbidden Error.
    return this.validateToken(request)
  }

  private validateToken(request: Record<string, any>) {
    const { authorization } = request.headers

    if (!authorization) return false

    const [type, token] = authorization.split(" ")
    
    console.log(type, token) // result: Bearer accessToken

    if (!type || !token) return false

    return true
  }
}
