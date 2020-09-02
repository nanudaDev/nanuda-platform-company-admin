import { BaseService } from '@/core';
import JwtStorageService from './jwt-storage.service';
import {
  SigninDto,
  BaseUser,
  CheckSMSCodeDto,
  RegisterSMSCodeDto,
  ChangePasswordDto,
  ChangePasswordReturnDto,
} from './dto';
import { Observable } from 'rxjs';
import { Pagination } from '@/common/interfaces/pagination.type';
import { Auth } from './dto/auth.dto';
import * as JWThelper from 'jwthelper';

class AuthService extends BaseService {
  constructor() {
    super();
  }

  signin(credential: SigninDto): Observable<any> {
    return this.post('auth/company-user/login', credential);
  }

  //   logout and remove session storage
  signout() {
    return JwtStorageService.removeToken();
  }

  //   verify if token is valid
  isTokenExpired(token: string) {
    if (token) {
      return JWThelper.verify(token);
    } else {
      return null;
    }
  }
  getSMSCode(registerSMSCodeDto: RegisterSMSCodeDto) {
    return this.post('register-sms-code', registerSMSCodeDto);
  }
  checkSMSCode(checkSMSCodeDto: CheckSMSCodeDto) {
    return this.post('check-sms-code', checkSMSCodeDto);
  }
  validatePassword(changePasswordDto: ChangePasswordDto) {
    return this.post<ChangePasswordReturnDto>(
      'auth/company-user/validate-password',
      changePasswordDto,
    );
  }
  updatePassword(changePasswordDto: ChangePasswordDto) {
    return this.post('auth/company-user/update-password', changePasswordDto);
  }
}

export default new AuthService();
