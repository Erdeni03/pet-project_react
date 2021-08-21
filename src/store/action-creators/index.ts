import * as UserActionCreators from './users'
import * as PaintToolActionCreators from './paint_online'

// eslint-disable-next-line
export default {
    ...UserActionCreators,
    ...PaintToolActionCreators
}