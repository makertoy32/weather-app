import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const api_key = import.meta.env.VITE_WEATHER_API_KEY;
  
  const [text,setText]=useState("");  


    async function getData() {
      
    try {
      const resposne = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${text}?key=${api_key}`);
      const data =  await resposne.json();

      console.log(data);
      console.log(text);
    } catch (error) {
      alert("Error what u entered is not a place")
      setText("");

    }
      
      
      

    }

    
  
  

  

  return (
    <>
    <h1 className='text-4xl text-red-500'>Start</h1>
    <input value={text} onChange={(e)=>{setText(e.target.value)}} type="text" />

    <button onClick={getData}>Get Data</button>
    </>
  )
}

export default App
