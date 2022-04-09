import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'documentTypeToken',
})
export class DocumentTypePipe implements PipeTransform {
  transform(value: string): string {
    return `COMMON.DOCUMENT_TYPE.${value}`;
  }
}

@Pipe({
  name: 'consumableTypeToken',
})
export class ConsumableTypePipe implements PipeTransform {
  transform(value: string): string {
    return `COMMON.CONSUMABLE_TYPE.${value}`;
  }
}
