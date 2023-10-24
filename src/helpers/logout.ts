import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";

export const logout = async () => {
  try {
    await signOut(auth);
    console.log("Logged out");
  } catch (err) {
    console.log(err);
  }
};
