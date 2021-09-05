import * as UserActionCreators from './users'
import * as PaintToolActionCreators from './paint_online'
import * as AuthActionCreators from './auth'
import * as AlertActionCreators from './alert'

// eslint-disable-next-line
export default {
  ...UserActionCreators,
  ...PaintToolActionCreators,
  ...AuthActionCreators,
  ...AlertActionCreators,
}
