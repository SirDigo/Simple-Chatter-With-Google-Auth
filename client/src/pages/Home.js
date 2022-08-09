import { useEffect, useState } from 'react'
import jwt_decode from "jwt-decode"

export default function Home({ user, setUser }){
    const [ error, setError ] = useState(false)

  function handleCallbackResponse(response){
    // console.log(response.credential);
    const userObject = jwt_decode(response.credential);

    console.table("userObject", userObject.hd);
    if (!userObject.email.includes("@mna.co") || userObject.hd !== "mna.co") {
      setError(true)
      return
    }
    setError(false)
    setUser(userObject);
    // console.log(userObject)
    document.getElementById("sign-in-div").hidden = true;
    localStorage.setItem('user', JSON.stringify(userObject));
  }

  function handleSignOut(e){
    setUser({})
    document.getElementById("sign-in-div").hidden = false;
    localStorage.removeItem('user');
    initializeGoogleDiv()
  }

  function initializeGoogleDiv(){
    /* global google */
    google.accounts.id.initialize({
      client_id: "6042841804-vmcqfpokq00p7799st2qih3r9570vo3f.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("sign-in-div"),
      { theme: "outline", size: "large" }
    )

    google.accounts.id.prompt();
  }

  useEffect(() => {
    // Persisting user with local storage
    if(localStorage.getItem('user') !== null){
      const loggedUser = JSON.parse(localStorage.getItem('user'));
      document.getElementById("sign-in-div").hidden = true;
      setUser(loggedUser)
      return
    }

    initializeGoogleDiv()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="App">
      <h1>Welcome to minds + assembly!</h1>
      <div id='sign-in-div'>button</div>
      { Object.keys(user).length !== 0 &&
        <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
      }
      {/* <button onClick={() => console.log(localStorage.getItem('user'))}>Console</button> */}
      { user &&
        <div>
          <img src={user.picture} alt=""/>
          <h1>{user.given_name} {user.family_name}</h1>
          <h2>{user.email}</h2>
        </div>
      }
      { error &&
        <div>
          <h1>This site is for mna.co employees only.</h1>
        </div>
      }
    </div>
  );
}