import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '@commons/const/paginate';
import { PaginateResult } from '@commons/DTO/paginate';
import { ERROR_MESSAGE } from '@commons/enums/errorMessage';
import { comparePassword, hashPassword } from '@commons/utils/password';
import { getCurentTimestamp } from '@commons/utils/time';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChangePasswordRequestBodyDto } from './DTO/changePassword.dto';
import { CreateUserRequestBodyDto } from './DTO/createUser.dto';
import { EditUserRequestBodyDto } from './DTO/editUser.dto';
import { QueryUserRequestQueryDto } from './DTO/queryUser.dto';
import { User, UserDocument } from './models/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(data: CreateUserRequestBodyDto) {
    const hashedPassword = await hashPassword(data.password);
    const user = await this.userModel.create({
      ...data,
      password: hashedPassword,
      createdAt: getCurentTimestamp(),
    });
    user.password = undefined;
    return user;
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  findById(id: string): Promise<User | undefined> {
    return this.userModel.findById(id).exec();
  }

  findByIdWithRoles(id: string): Promise<User | undefined> {
    return this.userModel
      .findById(id, null, {
        populate: 'roles',
      })
      .exec();
  }

  async changePassword(user: UserDocument, data: ChangePasswordRequestBodyDto) {
    const { oldPassword, newPassword } = data;

    const isMatch = await comparePassword(oldPassword, user.password);
    if (!isMatch) {
      throw new ForbiddenException();
    }

    await this.userModel.findByIdAndUpdate(user.id, {
      password: await hashPassword(newPassword),
    });

    return true;
  }

  async editUser(id: string, data: EditUserRequestBodyDto) {
    const result = await this.userModel.findByIdAndUpdate(id, data);

    if (!result) {
      throw new BadRequestException(
        ERROR_MESSAGE.NOT_EXIST.replace('{0}', `User id ${id}`),
      );
    }

    return true;
  }

  async deleteUser(id: string) {
    const result = await this.userModel.findByIdAndRemove(id);
    if (!result) {
      throw new BadRequestException(
        ERROR_MESSAGE.NOT_EXIST.replace('{0}', `User id ${id}`),
      );
    }

    return true;
  }

  async resetPassword(id: string, password: string) {
    return this.userModel.findByIdAndUpdate(id, {
      password: await hashPassword(password),
    });
  }

  async getUser(id: string) {
    const user = await this.userModel.findById(id, { password: 0 }).exec();
    return {
      appId: user.id,
      ...user.toJSON(),
    };
  }

  async queryUser(input: QueryUserRequestQueryDto) {
    const { pageSize = DEFAULT_PAGE_SIZE, pageIndex = DEFAULT_PAGE_INDEX } =
      input;

    const totalCount = await this.userModel.count();
    const users = await this.userModel
      .find({}, null, {
        projection: {
          password: 0,
        },
        skip: pageSize * (pageIndex - 1),
        limit: pageSize,
      })
      .exec();

    return new PaginateResult(
      users.map((i) => ({
        appId: i.id,
        ...i.toJSON(),
      })),
      totalCount,
      pageSize,
      pageIndex,
    );
  }
}
