export type KeyValueMap = (key: string, value: any) => [string, any];

export class BaseDto<T> {
  constructor(partial?: any) {
    Object.assign(this, partial);
  }
}
