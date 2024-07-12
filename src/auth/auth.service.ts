import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { signUpdto } from './dto/signup,dto';
import { Logindto } from './dto/login.dto';


@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtservice: JwtService
    ) { }

    async signUp(signUpDto: signUpdto): Promise<{ token: string }> {
        const { name, email, password } = signUpDto

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await this.userModel.create({
            name,
            email,
            password: hashedPassword
        })

        const token = this.jwtservice.sign({ id: user._id, email })

        return { token }
    }

    async login(loginDto: Logindto): Promise<{ token: string }> {
        const { email, password } = loginDto;
        const user = await this.userModel.findOne({ email })
        if (!user) {
            throw new UnauthorizedException('Invalid email or Password')
        }

        const ispasswordmatch = await bcrypt.compare(password, user.password)

        if (!ispasswordmatch) {
            throw new UnauthorizedException("Incorrect Password");
        }

        const token = this.jwtservice.sign({ id: user._id, email });


        return { token };



    }
}
