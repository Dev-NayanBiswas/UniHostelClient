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
import useToken from "../Hooks/Token/useToken.jsx";

function AuthProvider({children}){
  const {createToken} = useToken()
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
  
      const googleProvider = new GoogleAuthProvider();
  
      //!Login with Google 
      function googleLogin(){
        setLoading(true)
        return signInWithPopup(auth, googleProvider);

      }
  
      //! Sign Up with Email
      function registrationWithEmail(email,password){
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);

      }
      
      //!Sign In with Email 
        function signingWithEmail(email,password){
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
       
      }
  
      //! Update UserProfile
      function updateUserProfile(displayName, photoURL){
        setLoading(true)
        return updateProfile(auth.currentUser, {
          displayName: displayName, photoURL: photoURL
        })
      }
  
  
      //! SignOut 
      function signOutUser(){
        setLoading(false)
        console.log('sign out just triggered')
        return signOut(auth)
      }
  
      //! Observer 
      useEffect(()=>{
        const subscriber = onAuthStateChanged(auth,(currentUser)=>{
          console.log(currentUser);
          
          
          if(currentUser?.email){
              setUserData(currentUser);
              const email = {email:currentUser.email};
              createToken(email)
            }else{
              setUserData(currentUser);
              localStorage.removeItem("ClientSecret")
            }
            setLoading(false)
          return ()=>{
            subscriber()
          }
        }) 
      },[])
  
      // console.log(userData);
  
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