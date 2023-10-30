import { NavigateFunction, NavigateOptions } from 'react-router-dom';

const history: {
  navigate: NavigateFunction | null;
  push: (page: string, options?: NavigateOptions) => void;
} = {
  navigate: null,
  push: (page: string, options?: NavigateOptions): void =>
    history.navigate?.(page, options),
};

export default history;
