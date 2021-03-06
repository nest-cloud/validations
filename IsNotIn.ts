import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Validator } from 'class-validator';

@Injectable()
export class IsNotIn implements PipeTransform<any> {
    private readonly message: string;
    private readonly possibleValues: any[];
    private readonly validator: Validator;

    constructor(possibleValues: any[], message?: string) {
        this.message = message || '';
        this.possibleValues = possibleValues;
        this.validator = new Validator();
    }

    async transform(value: any, metadata: ArgumentMetadata) {
        if (value === undefined) {
            return value;
        }
        if (!this.validator.isNotIn(value, this.possibleValues)) {
            const { data } = metadata;
            const defaults = data ? `${data} is invalid` : 'Validation failed';
            throw new BadRequestException(this.message || defaults);
        }
        return value;
    }
}
