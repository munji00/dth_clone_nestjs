
import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JsonPayload } from './interfaces/jwt_payload.td';

@Injectable()
export class JwtService {
  private readonly secretKey = process.env.JWT_SECRET;

  generateToken(payload:JsonPayload): string {
    return jwt.sign(payload, this.secretKey, { expiresIn: '1h' });
  }

  verifyToken(token: string):JsonPayload{
    try {
      return jwt.verify(token, this.secretKey);
    } catch (error) {
      return null;
    }
  }
}
