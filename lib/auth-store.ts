import { UserAccount } from './types';

const CITIZEN_STORAGE_KEY = 'parvangi_current_user';
const ADMIN_STORAGE_KEY = 'parvangi_admin_session';
const ALL_USERS_KEY = 'parvangi_registered_users';

export const DEMO_USERS: UserAccount[] = [
  {
    id: 'user_ramesh_01',
    name: 'Ramesh Patil',
    age: 34,
    phone: '9822012345',
    email: 'ramesh.patil@maha-msme.in',
    createdAt: '2026-02-15T10:30:00Z'
  },
  {
    id: 'user_sneha_02',
    name: 'Sneha Kulkarni',
    age: 29,
    phone: '9822067890',
    email: 'sneha.kulkarni@maha-msme.in',
    createdAt: '2026-02-28T14:15:00Z'
  }
];

export const ADMIN_CREDENTIALS = {
  userId: 'admin',
  password: 'admin',
  designation: 'General Manager, District Industries Centre (DIC) / Nodal Officer',
  department: 'Directorate of Industries, Government of Maharashtra'
};

function isClient(): boolean {
  return typeof window !== 'undefined';
}

export function getAllUsers(): UserAccount[] {
  if (!isClient()) return DEMO_USERS;
  try {
    const stored = localStorage.getItem(ALL_USERS_KEY);
    if (!stored) {
      localStorage.setItem(ALL_USERS_KEY, JSON.stringify(DEMO_USERS));
      return DEMO_USERS;
    }
    return JSON.parse(stored);
  } catch {
    return DEMO_USERS;
  }
}

export function getCurrentUser(): UserAccount | null {
  if (!isClient()) return null;
  try {
    const stored = localStorage.getItem(CITIZEN_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // fallback
  }
  return null;
}

export function isAdminLoggedIn(): boolean {
  if (!isClient()) return false;
  try {
    return localStorage.getItem(ADMIN_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

export function signupCitizen(input: {
  name: string;
  age: number;
  phone: string;
  email: string;
}): { success: boolean; user?: UserAccount; error?: string } {
  if (!input.name.trim()) {
    return { success: false, error: 'Name is required' };
  }
  if (!input.phone.trim() || input.phone.trim().length < 10) {
    return { success: false, error: 'Valid 10-digit mobile number is required' };
  }
  if (!input.age || input.age < 18 || input.age > 100) {
    return { success: false, error: 'Valid age (18+) is required' };
  }

  const users = getAllUsers();
  const existing = users.find((u) => u.phone === input.phone.trim());
  if (existing) {
    // Log them in if already registered
    if (isClient()) {
      localStorage.setItem(CITIZEN_STORAGE_KEY, JSON.stringify(existing));
      window.dispatchEvent(new Event('parvangi_auth_change'));
    }
    return { success: true, user: existing };
  }

  const newUser: UserAccount = {
    id: `user_${Date.now()}`,
    name: input.name.trim(),
    age: Number(input.age),
    phone: input.phone.trim(),
    email: input.email.trim() || `${input.phone.trim()}@citizen.parvangi.in`,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  if (isClient()) {
    localStorage.setItem(ALL_USERS_KEY, JSON.stringify(users));
    localStorage.setItem(CITIZEN_STORAGE_KEY, JSON.stringify(newUser));
    window.dispatchEvent(new Event('parvangi_auth_change'));
  }

  return { success: true, user: newUser };
}

export function loginCitizen(phoneOrName: string): { success: boolean; user?: UserAccount; error?: string } {
  const q = phoneOrName.trim().toLowerCase();
  if (!q) {
    return { success: false, error: 'Please enter your phone number or name' };
  }

  const users = getAllUsers();
  const found = users.find(
    (u) => u.phone.includes(q) || u.name.toLowerCase().includes(q)
  );

  if (!found) {
    return {
      success: false,
      error: 'User not found. Please click "New Citizen Signup" to register.'
    };
  }

  if (isClient()) {
    localStorage.setItem(CITIZEN_STORAGE_KEY, JSON.stringify(found));
    window.dispatchEvent(new Event('parvangi_auth_change'));
  }

  return { success: true, user: found };
}

export function loginAdmin(
  userIdInput: string,
  passwordInput: string
): { success: boolean; error?: string } {
  const u = userIdInput.trim().toLowerCase();
  const p = passwordInput.trim();

  if (
    (u === 'admin' || u === 'officer' || u === 'maha_admin' || u === 'admin@maha.gov.in') &&
    (p === 'admin' || p === 'maha@2026' || p === 'password')
  ) {
    if (isClient()) {
      localStorage.setItem(ADMIN_STORAGE_KEY, 'true');
      window.dispatchEvent(new Event('parvangi_auth_change'));
    }
    return { success: true };
  }

  return { success: false, error: 'Invalid User ID or Password. Try admin / admin.' };
}

export function logout(): void {
  if (isClient()) {
    localStorage.removeItem(CITIZEN_STORAGE_KEY);
    localStorage.removeItem(ADMIN_STORAGE_KEY);
    window.dispatchEvent(new Event('parvangi_auth_change'));
  }
}
