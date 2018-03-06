import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// Mock react-ga library
jest.mock('react-ga');

configure({ adapter: new Adapter() });
