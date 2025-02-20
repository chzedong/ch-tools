import {createSelector} from 'reselect';

export const todoTagsSelector = createSelector(
  todo => todo,
  todo => todo.tags,
);
