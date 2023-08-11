import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsEmail(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isEmail',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const pattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
                    return typeof value === 'string' && pattern.test(value);
                },
                defaultMessage(args: ValidationArguments) {
                    return `${args.property} must be a valid email address`;
                },
            },
        });
    };
}
