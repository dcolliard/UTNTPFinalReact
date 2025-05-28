import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";
import { auth, db } from "../config/firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);           
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const uid = credential.user.uid;

    const profileRef = doc(db, "users", uid);
    const profileSnap = await getDoc(profileRef);

    if (profileSnap.exists()) {
      setUser(credential.user);
      setUserProfile(profileSnap.data());
    } else {
      throw new Error("Perfil de usuario no encontrado");
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setUserProfile(null);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const uid = firebaseUser.uid;
        const profileRef = doc(db, "usuarios", uid);
        const profileSnap = await getDoc(profileRef);
        setUser(firebaseUser);
        setUserProfile(profileSnap.exists() ? profileSnap.data() : null);
      } else {
        setUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, userProfile, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
