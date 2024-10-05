import tab from './tab/handler'
import bookmark from './bookmark/handler'
import history from './history/handler'
import quickCast from './quick-cast/handler'

export default {
  ...tab,
  ...bookmark,
  ...history,
  ...quickCast,
}
