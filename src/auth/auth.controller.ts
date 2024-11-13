import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Redirect,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import { UserRequest } from 'src/utils/types/request';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  async googleAuth() {}

  @Get('google/callback')
  @HttpCode(HttpStatus.OK)
  @Redirect('http://localhost:3000') // TODO: env var
  @UseGuards(GoogleOauthGuard)
  async googleAuhCallback(@Request() req: UserRequest, @Response() res) {
    const token = await this.authService.login(req.user);

    // TODO: update params
    res.cookie('access_token', token, {
      maxAge: 2592000000,
      sameSite: true,
      secure: false,
    });
  }
}
