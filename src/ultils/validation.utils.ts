import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

// Check any fields value already existed in database;
@ValidatorConstraint({ name: 'Unique', async: true })
@Injectable()
export class UniqueConstraints implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {}

  async validate(value: any, args: ValidationArguments): Promise<any> {
    const record = await this.userService.findExisted(args.property, value);
    if (record === null) return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} is already existed`;
  }
}

export function Unique(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: UniqueConstraints,
    });
  };
}

// End checking unique
