import { Record } from 'immutable';

export const TypedRecord = <TProperties>(defaultValues: TProperties) =>  (
  class InternalTypedRecord extends Record(defaultValues) {
    constructor(params?: Partial<TProperties>) {
      params ? super(params) : super();
    };

    alter(params: Partial<TProperties>) {
      return this.merge(params) as this;
    };
  });
