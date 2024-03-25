export default function useLocalStorage({ key }) {

    const [value, setValue] = useState(localStorage.getItem(key));
  
    const updateValue = (newValue) => {
        localStorage.setItem(key, newValue); // If theyre the same, React wont cause a re-render, so dont worry about checking
    };
  
    useEffect(() => {
        
        const handleLocalStorageChange = (event) => {
            if (event.key === key) {
                setValue(localStorage.getItem(key)); // Handles deletes fine
            }
        };
  
      window.addEventListener("storage", handleLocalStorageChange);
      return () => window.removeEventListener("storage", handleLocalStorageChange);

    }, [key]);
  
    return [value, updateValue]; // Only allow the user to update their key via local storage which will then propagate the changes into memory
  
  }
