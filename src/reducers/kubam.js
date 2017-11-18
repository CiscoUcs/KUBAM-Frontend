import {
  POST_FEEDBACK,
  POSTED_FEEDBACK,
} from '../actions'

const kubam = (state = {
  feedback: "",
  }, action) => {
  switch (action.type) {
    case POST_FEEDBACK:
      return Object.assign({}, state, {
        feedback: action.feedback,
      })
    case POSTED_FEEDBACK:
      return Object.assign({}, state, {
        feedback: "",
      })
    default:
      return state
  }
}
export default kubam
