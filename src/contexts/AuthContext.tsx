import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '../firebase';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInEmailPassword: (email: string, pass: string) => Promise<void>;
  signUpEmailPassword: (name: string, email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        // Sync user doc
        try {
          await setDoc(
            doc(db, 'users', user.uid),
            {
              id: user.uid,
              displayName: user.displayName || user.email?.split('@')[0] || 'Sinh viên',
              email: user.email,
              photoURL: user.photoURL || '',
              updatedAt: new Date().toISOString(),
            },
            { merge: true }
          );
        } catch (err) {
          console.warn('Could not sync user profile to firestore', err);
        }
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    try {
      setError(null);
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      console.error('Google Sign In error:', err);
      setError(err?.message || 'Đăng nhập Google thất bại');
      throw err;
    }
  };

  const signInEmailPassword = async (email: string, pass: string) => {
    try {
      setError(null);
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (err: any) {
      console.error('Sign In error:', err);
      let msg = 'Đăng nhập không thành công';
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        msg = 'Email hoặc mật khẩu không chính xác';
      } else if (err.code === 'auth/invalid-email') {
        msg = 'Địa chỉ email không hợp lệ';
      }
      setError(msg);
      throw new Error(msg);
    }
  };

  const signUpEmailPassword = async (name: string, email: string, pass: string) => {
    try {
      setError(null);
      const res = await createUserWithEmailAndPassword(auth, email, pass);
      if (res.user) {
        await updateProfile(res.user, { displayName: name });
        // Create initial firestore doc
        await setDoc(doc(db, 'users', res.user.uid), {
          id: res.user.uid,
          displayName: name,
          email: res.user.email,
          createdAt: new Date().toISOString(),
        });
      }
    } catch (err: any) {
      console.error('Sign Up error:', err);
      let msg = 'Đăng ký không thành công';
      if (err.code === 'auth/email-already-in-use') {
        msg = 'Email này đã được đăng ký tài khoản';
      } else if (err.code === 'auth/weak-password') {
        msg = 'Mật khẩu cần ít nhất 6 ký tự';
      }
      setError(msg);
      throw new Error(msg);
    }
  };

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (err: any) {
      console.error('Sign Out error:', err);
    }
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        signInWithGoogle,
        signInEmailPassword,
        signUpEmailPassword,
        logout,
        error,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
