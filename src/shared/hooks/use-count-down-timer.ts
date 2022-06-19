import { useCallback, useEffect, useReducer } from 'react';

type countDownActions =
  | { type: 'START' }
  | { type: 'RESET'; payload: number }
  | { type: 'PAUSE' }
  | { type: 'RUNNING' }
  | { type: 'TICK'; payload: number };

type countDownState = {
  canStart: boolean;
  countdown: number;
  isRunning: boolean;
};

function countDownReducer(state: countDownState, action: countDownActions) {
  switch (action.type) {
    case 'START':
      return {
        ...state,
        canStart: state.countdown !== 0,
      };
    case 'RESET':
      return {
        ...state,
        countdown: action.payload,
        canStart: false,
        isRunning: false,
      };
    case 'PAUSE':
      return {
        ...state,
        canStart: false,
        isRunning: false,
      };
    case 'RUNNING':
      return {
        ...state,
        isRunning: true,
      };
    case 'TICK':
      return {
        ...state,
        countdown: state.countdown - action.payload,
      };
    default:
      return state;
  }
}

export function useCountdownTimer(
  timer: number = 0,
  interval: number = 1000,
  autostart: boolean = false,
  expireImmediate: boolean = false,
  resetOnExpire: boolean = true,
  onExpire?: () => void,
  onReset?: () => void,
): {
  countdown: number;
  isRunning: boolean;
  startCountDown: () => void;
  resetCountDown: () => void;
  pauseCountDown: () => void;
} {
  const [state, dispatch] = useReducer(countDownReducer, {
    canStart: autostart,
    countdown: timer,
    isRunning: false,
  });

  function startCountDown() {
    dispatch({ type: 'START' });
  }

  function pauseCountDown() {
    dispatch({ type: 'PAUSE' });
  }

  function initStopped(time: number) {
    dispatch({ type: 'RESET', payload: time });
  }

  const resetCountDown = useCallback(() => {
    initStopped(timer);
    if (onReset && typeof onReset === 'function') {
      onReset();
    }
  }, [timer, onReset]);

  const expireCountDown = useCallback(() => {
    initStopped(resetOnExpire ? timer : 0);
    if (onExpire && typeof onExpire === 'function') {
      onExpire();
    }
  }, [timer, onExpire, resetOnExpire]);

  useEffect(() => {
    function tick() {
      if (
        state.countdown / 1000 <= 0 ||
        (expireImmediate && (state.countdown - interval) / 1000 <= 0)
      ) {
        expireCountDown();
      } else {
        dispatch({ type: 'TICK', payload: interval });
      }
    }

    let id: NodeJS.Timeout;
    if (state.canStart) {
      id = setInterval(tick, interval);
      if (!state.isRunning) {
        dispatch({ type: 'RUNNING' });
      }
    }
    return () => clearInterval(id);
  }, [
    expireCountDown,
    expireImmediate,
    interval,
    state.canStart,
    state.countdown,
    state.isRunning,
  ]);

  return {
    countdown: state.countdown,
    isRunning: state.isRunning,
    startCountDown,
    resetCountDown,
    pauseCountDown,
  };
}
