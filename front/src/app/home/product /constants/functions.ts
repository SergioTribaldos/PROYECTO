import { Condition } from '../model/product';

export const setConditionClass = (condition) => {
  switch (condition) {
    case Condition.mint:
      return 'condition-mint';
      break;
    case Condition.semi_new:
      return 'condition-semi-new';
      break;
    case Condition.used:
      return 'condition-used';
      break;
  }
};
