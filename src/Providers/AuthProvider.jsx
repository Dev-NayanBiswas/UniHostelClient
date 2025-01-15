import { useEffect, useState } from "react";
import auth from "../firebase.js"
import { AuthContext } from "./Contexts/AuthContext";
import {
    signOut, 
    signInWithPopup, 
    GoogleAuthProvider, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    updateProfile,
    } from "firebase/auth";

function AuthProvider({children}){
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
  
      const googleProvider = new GoogleAuthProvider();
  
      //!Login with Google 
      async function googleLogin(){
        setLoading(true)
          const response = await signInWithPopup(auth, googleProvider);
          return response;
      }
  
      //! Sign Up with Email
      async function registrationWithEmail(email,password){
        setLoading(true)
        const response = await createUserWithEmailAndPassword(auth, email, password);
        return response;
      }
      
      //!Sign In with Email 
      async function signingWithEmail(email,password){
        setLoading(true)
        const response = await signInWithEmailAndPassword(auth, email, password);
        return response;
      }
  
      //! Update UserProfile
      async function updateUserProfile(displayName, photoURL){
        setLoading(true)
        const response =  await updateProfile(auth.currentUser, {
          displayName: displayName, photoURL: photoURL
        })

        return response;
      }
  
  
      //! SignOut 
      function signOutUser(){
        setLoading(true)
        signOut(auth)
        .then(()=>alert('You just Signed out'))
        .catch(error=>alert(error.message))
      }
  
      //! Observer 
      useEffect(()=>{
        const subscriber = onAuthStateChanged(auth, async (currentUser)=>{
            setUserData(currentUser)
            setLoading(false)
          return ()=>{
            subscriber()
          }
        }) 
      },[])
  
      
  
      const authObject = {
        loading,
        userData,
        googleLogin,
        signOutUser,
        signingWithEmail,
        updateUserProfile,
        registrationWithEmail
      }
  return (
    <AuthContext.Provider value={authObject}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider