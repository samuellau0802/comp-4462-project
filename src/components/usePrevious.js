// usePrevious.js

import { useEffect, useRef } from 'react';

export default function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
