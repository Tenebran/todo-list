import { appReducer, appSetErrorAC, appSetStatusAC, InitialStateType } from './app-reducer';

let startState: InitialStateType;

beforeEach(() => {
  startState = { error: null, status: 'idle' };
});

test('correct error messages should be set', () => {
  const endState = appReducer(startState, appSetErrorAC('Some Error'));

  expect(endState.error).toBe('Some Error');
});

test('correct status should be set', () => {
  const endState = appReducer(startState, appSetStatusAC('loading'));

  expect(endState.status).toBe('loading');
});
