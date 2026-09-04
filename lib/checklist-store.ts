import { ChecklistResult } from './types';

const GUEST_CHECKLIST_KEY = 'parvangi_guest_checklist';
const LEGACY_SAVED_CHECKLIST_KEY = 'parvangi-saved-checklist';

function isClient(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Get user-scoped checklist or guest checklist.
 * Stale or shared legacy checklists are not returned for new sessions.
 */
export function getUserChecklist(userId?: string): ChecklistResult | null {
  if (!isClient()) return null;

  try {
    if (userId) {
      const saved = localStorage.getItem(`parvangi_user_checklist_${userId}`);
      if (saved) {
        return JSON.parse(saved) as ChecklistResult;
      }
      return null;
    }

    // Guest checklist
    const guestSaved = sessionStorage.getItem(GUEST_CHECKLIST_KEY) || localStorage.getItem(GUEST_CHECKLIST_KEY);
    if (guestSaved) {
      return JSON.parse(guestSaved) as ChecklistResult;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Save checklist scoped to user or guest session.
 */
export function saveUserChecklist(result: ChecklistResult, userId?: string): void {
  if (!isClient()) return;

  try {
    if (userId) {
      localStorage.setItem(`parvangi_user_checklist_${userId}`, JSON.stringify(result));
    } else {
      sessionStorage.setItem(GUEST_CHECKLIST_KEY, JSON.stringify(result));
      localStorage.setItem(GUEST_CHECKLIST_KEY, JSON.stringify(result));
    }
    // Clean up old legacy key if present to prevent cross-user leakage
    localStorage.removeItem(LEGACY_SAVED_CHECKLIST_KEY);
    window.dispatchEvent(new Event('parvangi_checklist_change'));
  } catch {
    // ignore
  }
}

/**
 * Clear checklist for user or guest.
 */
export function clearUserChecklist(userId?: string): void {
  if (!isClient()) return;

  try {
    if (userId) {
      localStorage.removeItem(`parvangi_user_checklist_${userId}`);
    } else {
      sessionStorage.removeItem(GUEST_CHECKLIST_KEY);
      localStorage.removeItem(GUEST_CHECKLIST_KEY);
    }
    localStorage.removeItem(LEGACY_SAVED_CHECKLIST_KEY);
    window.dispatchEvent(new Event('parvangi_checklist_change'));
  } catch {
    // ignore
  }
}
