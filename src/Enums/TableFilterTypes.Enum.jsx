import { TableFilterOperatorsEnum } from './TableFilterOperators.Enum';

export const TableFilterTypesEnum = {
  textInput: {
    key: 1,
    defaultOperators: [
      {
        key: TableFilterOperatorsEnum.equal.key,
      },
      {
        key: TableFilterOperatorsEnum.contains.key,
      },
      {
        key: TableFilterOperatorsEnum.startWith.key,
      },
      {
        key: TableFilterOperatorsEnum.endWith.key,
      },
    ],
    defaultSelectedOperator: TableFilterOperatorsEnum.contains.key,
  },
  datePicker: {
    key: 2,
    defaultOperators: [
      {
        key: TableFilterOperatorsEnum.equal.key,
      },
      {
        key: TableFilterOperatorsEnum.lessThan.key,
      },
      {
        key: TableFilterOperatorsEnum.greaterThan.key,
      },
    ],
    defaultSelectedOperator: TableFilterOperatorsEnum.equal.key,
  },
};
