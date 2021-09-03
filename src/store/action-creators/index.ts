import * as UserActionCreators from './users';
import * as PaintToolActionCreators from './paint_online';
import * as AuthActionCreators from './auth';

// eslint-disable-next-line
export default {
  ...UserActionCreators,
  ...PaintToolActionCreators,
  ...AuthActionCreators,
};
