import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { comparePassword, hashPassword } from 'src/ultils/auth.utils';
import { StatusCode } from 'src/ultils/constant/HttpsCode';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/schemas/user.schema';
import { UserDTO } from 'src/user/user.dto';
import { listOfRolesFromUser } from 'src/ultils/listOfRolesFromUser.util';

@Injectable({})
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(userDTO: UserDTO): Promise<any> {
    const rawPassword = userDTO.password;
    const payload = {
      ...userDTO,
      password: await hashPassword(rawPassword),
    };
    await this.userService.create(payload);
  }

  async signIn(user: any): Promise<any> {
    if (user.statusCode === 401) return user;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, username, email, roles, ...rest } = user;
    const findUser = await this.userService.findById(user._id);
    const userListOfRoles = await listOfRolesFromUser(findUser);
    const payload = {
      id: rest._id,
      username: username,
      email: email,
      roles: userListOfRoles,
      refreshToken: user.refreshToken,
    };
    const tokens = await this.generateToken(payload);
    await this.updateRefreshToken(rest._id, tokens.refreshToken);
    return {
      rest,
      tokens,
    };
  }

  async signOut(id: User): Promise<User> {
    return await this.userService.updateRefreshToken(id, null);
  }

  async validateUser(username: string, rawpassword: string): Promise<any> {
    try {
      // Check if user existed
      const user = await this.userService.findExisted('username', username);
      if (!user) return null;

      // Check if password compare is same with that user
      const validatePassword = await comparePassword(
        rawpassword,
        user?.password,
      );
      if (!validatePassword || user.username !== username) return null;

      return user;
    } catch (e) {
      return {
        success: false,
        statusCode: StatusCode.BAD_REQUEST,
        err: e.message,
      };
    }
  }

  async generateToken(payload: any): Promise<any> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, { expiresIn: '1h' }),
      this.jwtService.signAsync(payload, {
        expiresIn: '7d',
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async updateRefreshToken(id: User, refreshToken: string): Promise<any> {
    const hashedRefreshToken = await hashPassword(refreshToken);
    return await this.userService.updateRefreshToken(id, hashedRefreshToken);
  }

  async refreshToken(id: any, refreshToken: string): Promise<any> {
    const user = await this.userService.findById(id);
    const payload = {
      id: user._id,
      username: user.username,
      email: user.email,
      roles: user.roles,
      refreshToken: user.refreshToken,
    };

    if (!user) throw new ForbiddenException('Access Denied');

    const refreshTokenMatches = await comparePassword(
      refreshToken,
      user.refreshToken,
    );

    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.generateToken(payload);
    await this.updateRefreshToken(id, tokens.refreshToken);
    return tokens;
  }
}
