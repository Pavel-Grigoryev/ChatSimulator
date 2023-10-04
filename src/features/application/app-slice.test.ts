import { appActions, appReducer } from 'src/features/application/index';
import { InitialAppState } from 'src/features/application/app-slice';

describe('appReducer', () => {
  let startState: InitialAppState;

  beforeEach(() => {
    startState = {
      status: 'idle',
      error: null,
      isInitialized: false,
    };
  });

  it('app should be changed its status', () => {
    const endState = appReducer(startState, appActions.setAppStatus({ status: 'loading' }));

    expect(endState.status).toBe('loading');
  });

  it('app should be changed its error message', () => {
    const endState = appReducer(startState, appActions.setAppError({ error: 'Some error' }));
    expect(endState.error).toBe('Some error');
  });

  it('app should be changed its Initialized status', () => {
    const endState = appReducer(
      startState,
      appActions.initializeApp.fulfilled(undefined, 'requestId', undefined)
    );

    expect(endState.isInitialized).toBe(true);
    expect(endState.status).toBe('idle');
  });
});
