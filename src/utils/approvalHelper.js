import { APPROVAL_ORDER } from '../hook/approval_order';

export function getNextStage(role) {
  const index = APPROVAL_ORDER.indexOf(role);
  if (index === APPROVAL_ORDER.length - 1) return 'completed'; // admin = last
  return APPROVAL_ORDER[index + 1];
}

export function getPreviousStage(role) {
  const index = APPROVAL_ORDER.indexOf(role);
  if (index <= 0) return null; // checker → back to user
  return APPROVAL_ORDER[index - 1];
}
