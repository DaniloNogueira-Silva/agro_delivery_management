import {
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/entities/user.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async login(email: string, password: string) {
    try {
      const user = await this.userModel.findOne({ email });
      if (!user) {
        this.logger.warn(`Login failed: email not found (${email})`);
        throw new UnauthorizedException('Invalid credentials');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        this.logger.warn(`Login failed: invalid password for email (${email})`);
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload = { sub: user._id, email: user.email };
      const token = await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
      });

      this.logger.log(`User logged in with email: ${email}`);
      return {
        access_token: token,
      };
    } catch (error) {
      this.logger.error(`Error during login for email: ${email}`, error.stack);
      throw error instanceof UnauthorizedException
        ? error
        : new InternalServerErrorException('Login failed');
    }
  }
}
