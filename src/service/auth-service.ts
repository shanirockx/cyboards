import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  type User,
  type AuthError,
  updateProfile,
} from "firebase/auth"
import { auth } from "./firebase-config"

export interface SignupData {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface SigninData {
  email: string
  password: string
}

export const signupWithEmail = async (userData: SignupData): Promise<User> => {
  try {
    console.log("Attempting to sign up with:", userData.email)

    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password)

    // Update user profile with first and last name
    await updateProfile(userCredential.user, {
      displayName: `${userData.firstName} ${userData.lastName}`,
    })

    console.log("User created successfully:", userCredential.user.uid)

    return userCredential.user
  } catch (error) {
    console.error("Firebase signup error:", error)
    const authError = error as AuthError
    throw new Error(getFirebaseErrorMessage(authError.code))
  }
}

export const signinWithEmail = async (userData: SigninData): Promise<User> => {
  try {
    console.log("Attempting to sign in with:", userData.email)

    // Sign in user with email and password
    const userCredential = await signInWithEmailAndPassword(auth, userData.email, userData.password)

    console.log("User signed in successfully:", userCredential.user.uid)

    return userCredential.user
  } catch (error) {
    console.error("Firebase signin error:", error)
    const authError = error as AuthError
    throw new Error(getFirebaseErrorMessage(authError.code))
  }
}

const getFirebaseErrorMessage = (errorCode: string): string => {
  console.log("Firebase error code:", errorCode)

  switch (errorCode) {
    case "auth/email-already-in-use":
      return "An account already exists with this email address."
    case "auth/invalid-email":
      return "Please enter a valid email address."
    case "auth/weak-password":
      return "The password must be at least 6 characters long."
    case "auth/operation-not-allowed":
      return "Email/password accounts are not enabled. Contact support."
    case "auth/too-many-requests":
      return "Too many failed attempts. Please try again later."
    case "auth/network-request-failed":
      return "Network error. Please check your internet connection."
    case "auth/user-not-found":
      return "No account found with this email address."
    case "auth/wrong-password":
      return "Incorrect password. Please try again."
    case "auth/invalid-credential":
      return "Invalid email or password. Please check your credentials."
    case "auth/user-disabled":
      return "This account has been disabled. Contact support."
    default:
      return `Authentication failed: ${errorCode}. Please try again.`
  }
}
