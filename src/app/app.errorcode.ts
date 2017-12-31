import { Injectable } from '@angular/core';

@Injectable()
export class ErrorCode {

  // AuthenticationErrorCode
  public AccessDenied = 'A0x001';
  public UnauthorizedUser = 'A0x002';
  public InvalidAPIKey = 'A0x003';
  public TokenExpired = 'A0x004';

}
