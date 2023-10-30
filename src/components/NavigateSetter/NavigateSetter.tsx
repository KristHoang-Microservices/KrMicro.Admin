import { useNavigate } from 'react-router-dom';

import history from '../../history';

/**
 * Used for navigating outside of component
 * @returns {null} nothing
 */
export function NavigateSetter(): null {
  history.navigate = useNavigate();

  return null;
}
