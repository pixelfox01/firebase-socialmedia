import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";

export const logout = async () => {
  try {
    await signOut(auth);
    console.log("Logged out");
  } catch (err) {
    let message: string = "";
    if (err instanceof Error) {
      message = err.message;
    } else {
      message = String(err);
    }
    throw new Error(message);
  }
};
