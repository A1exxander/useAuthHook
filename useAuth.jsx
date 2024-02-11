import { useState, useEffect } from "react";

export default function useAuth() {

  const [JWT, setJWT] = useState(localStorage.getItem("auth")); // Set initial state to use local storage auth value

  const updateJWT = (newJWT) => { // Update our JWT by updating local storage, NOT by calling the setState hook!
    localStorage.setItem("auth", newJWT);
  };

  useEffect(() => { // Everytime a change occurs to our JWT on local storage, update the state in memory to keep them synchronized

    const handleStorageChange = (event) => { 
      if (event.key === "auth" ) { // If theyre the same, React wont cause a re-render, so dont worry about checking
        setJWT(localStorage.getItem("auth"));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => { window.removeEventListener("storage", handleStorageChange); };

  }, []);

  return [JWT, updateJWT]; // Only allow the user to update JWT via local storage which will then propagate the changes into memory

}
