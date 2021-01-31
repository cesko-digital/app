import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

global.___loader = {
  enqueue: jest.fn(),
}

configure({ adapter: new Adapter() })
