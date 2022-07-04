import { useEffect, useRef } from 'react';

export const useEffectExceptOnMount = (
  effect: React.EffectCallback,
  dependencies: React.DependencyList
) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) effect();
    else didMount.current = true;
  }, dependencies);
};
