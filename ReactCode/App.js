import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { View } from "react-native";
import { Login } from './components/Login';
import { Home } from './components/Home';
import { useState, useEffect, createContext, useMemo } from "react";
import { auth, db, storage } from "./components/Firebase";
import { collection, doc, setDoc, getDoc } from "firebase/firestore"; 
import { ref } from "firebase/storage";
import { getStorage, getBytes } from "firebase/storage";
import { Profile } from "./components/Profile";
import { Register } from './components/Register';
import { VerifyEmail } from './components/VerifyEmail';
import { SearchPage } from './components/SearchPage';
import { Buffer } from "buffer";
import { UserDataContext, UserContext, AppDataContext, SelectedNetworksContext, UpdateUserDataContext, UpdateSelectedNetworksContext } from './components/ContextStuff';
import { ChangePassword } from './components/ChangePassword';
import { ForgotPassword } from './components/ForgotPassword';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { PhoneAppModal } from './components/PhoneAppModal';




function App() {
  const [currentUser, setCurrentUser] = useState(auth.currentUser);
  const [userData, setUserData] = useState({'watchList':[], 'watchedList': [], 'selectedNetworks': ['netflix', 'funimation', 'hulu', 'crunchroll']});
  const [appData, setAppData] = useState(null);
  const [selectedNetworks, setSelectedNetworks] = useState(['netflix', 'funimation', 'hulu', 'crunchroll']);

  function updateSelectedNetworks(networks){
    if(userData['selectedNetworks'] !== selectedNetworks){
      let tempUserData = {...userData};
      tempUserData['selectedNetworks'] = networks;
      updateUserData(tempUserData);
      setSelectedNetworks([...networks]);
    }
  }

  async function updateUserData (userDataInfo){
    if(auth.currentUser && auth.currentUser.emailVerified){
      const docRef = doc(db, "users", auth.currentUser.uid );
      setDoc(docRef,userDataInfo);
    }
    setUserData({...userDataInfo});
    // console.log(' updating user data: ', userDataInfo);
    }


  async function getUserData (userInfo){
    if(userInfo != null && userInfo.email && userInfo.emailVerified){
      const docRef = doc(db, "users", userInfo.uid );
      const docSnap = await getDoc(docRef);
      
      if(docSnap.exists()){
        let tempUserData = docSnap.data();
        setUserData({...tempUserData});
        setSelectedNetworks([...tempUserData['selectedNetworks']])
        // console.log('user data: ', tempUserData);
      }else{
        setDoc(docRef,{
          watchList: [],
          watchedList: [],
          selectedNetworks: ['netflix', 'funimation', 'hulu', 'crunchroll']
        });
        setUserData({'watchList':[], 'watchedList': [], 'selectedNetworks': ['netflix', 'funimation', 'hulu', 'crunchroll']});
      }
    }
  }

  async function getDatabaseData (){
    const pathReference = ref(storage, 'allDb.json');
    let res = await getBytes(pathReference);
    let data = new Uint8Array(res)
    let jsonString = Buffer.from(data).toString('utf8');
    let json = JSON.parse(jsonString);
    setAppData({...json}); 
  }

  
  function onAuthChange (value) {
    // console.log('top level');
    setCurrentUser(value);
    getUserData(value);
  }


  useEffect(() => {
    // console.log('use effect');
    auth.onAuthStateChanged(onAuthChange)
    getDatabaseData();
  }, [])
  
  
  // console.log('top render');

  return (
    <View style = {{flex: 1}}>
      <div className="App bg-dark">
        <PhoneAppModal/>
      
        <UserContext.Provider value={currentUser}>
        <AppDataContext.Provider value={appData}>
        <UserDataContext.Provider value={userData}>
        <UpdateUserDataContext.Provider value={updateUserData}>
        <SelectedNetworksContext.Provider value={selectedNetworks}>
        <UpdateSelectedNetworksContext.Provider value={updateSelectedNetworks}>

          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/verifyemail" element={<VerifyEmail/>}/>
              <Route path="/search" element={<SearchPage/>}/>
              <Route path="/changepassword" element={<ChangePassword/>}/>
              <Route path="/forgotpassword" element={<ForgotPassword/>}/>
              <Route path="/privacypolicy" element={<PrivacyPolicy/>}/>
            </Routes>
          </BrowserRouter>


        </UpdateSelectedNetworksContext.Provider>
        </SelectedNetworksContext.Provider>
        </UpdateUserDataContext.Provider>
        </UserDataContext.Provider>
        </AppDataContext.Provider>
        </UserContext.Provider>
        
      </div>
    </View>
  );
}

export default App;
