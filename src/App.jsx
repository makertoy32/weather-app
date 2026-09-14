import { useEffect,useState } from "react";
import { motion } from "motion/react";
import Lenis from "lenis";
import "./App.css";

function App() {
  const api_key = import.meta.env.VITE_WEATHER_API_KEY;

  const [text, setText] = useState("");
  const [weatherinfo, setWeatherinfo] = useState({});


  useEffect(() => {
  const lenis = new Lenis({
    smoothWheel: true,
    lerp: 0.1,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  return () => {
    lenis.destroy();
  };
}, []);

  async function getData() {
    try {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${text}?key=${api_key}`
      );

      if (!response.ok) {
        throw new Error("Location not found");
      }

      const data = await response.json();
      console.log(data)
      setWeatherinfo(data);

    } catch (error) {
      console.log(error);
      alert("Invalid City! Could not find that location");
      setText("");
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-sky-400 via-blue-500 to-indigo-600 px-4 py-8 sm:px-6 lg:px-10">

      {/* Main container */}
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center text-white mb-8 sm:mb-10">

          <motion.div
          className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
  initial={{ opacity: 0, y: -30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  <h1>Weather App</h1>
</motion.div>
          {/* <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Weather App
          </h1> */}

          <p className="mt-3 text-sm sm:text-base text-white/80">
            Search a city to see its weather forecast
          </p>

        </div>


        {/* Search section */}
        <div className="max-w-xl mx-auto mb-10">

          <div className="bg-white/90 border border-white/30 rounded-2xl p-4 sm:p-5 shadow-xl">

            <div className="flex flex-col sm:flex-row gap-3">

              <input
                className="
                  flex-1
                  px-4 py-3
                  rounded-xl
                  border-2 border-transparent
                  bg-white
                  text-gray-800
                  outline-none
                  placeholder:text-gray-400
                  focus:border-blue-400
                  transition-all duration-200
                "
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    getData();
                  }
                }}
                type="text"
                placeholder="Enter city name..."
              />

              {/* <button
                onClick={getData}
                className="
                  px-6 py-3
                  rounded-xl
                  bg-blue-700
                  text-white
                  font-semibold
                  hover:bg-blue-800
                  hover:-translate-y-0.5
                  active:translate-y-0
                  transition-all duration-200
                  cursor-pointer
                  shadow-lg
                "
              >
                Get Weather
              </button> */}
              <motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  onClick={getData}
  className="px-6 py-3 rounded-xl bg-blue-700 text-white font-semibold cursor-pointer"
>
  Get Weather
</motion.button>

            </div>

          </div>

        </div>


        {/* Weather information */}
        {weatherinfo.days && (

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

            {/* Location header */}
            <div className="p-5 sm:p-7 text-center bg-white">

              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                Weather forecast for
              </p>

              <h2 className="mt-1 text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
                {weatherinfo.resolvedAddress}
              </h2>

            </div>


            {/* Table wrapper */}
            <div className="overflow-x-auto">

              <table className="w-full min-w-[700px]">

                <thead>
                  <tr className="bg-blue-600 text-white">

                    <th className="px-4 py-4 text-left text-sm sm:text-base font-semibold">
                      Date
                    </th>

                    <th className="px-4 py-4 text-left text-sm sm:text-base font-semibold">
                      Temperature
                    </th>

                    <th className="px-4 py-4 text-left text-sm sm:text-base font-semibold">
                      Humidity
                    </th>

                    <th className="px-4 py-4 text-left text-sm sm:text-base font-semibold">
                      Wind Speed
                    </th>

                    <th className="px-4 py-4 text-left text-sm sm:text-base font-semibold">
                      MinTemp
                    </th>
                    <th className="px-4 py-4 text-left text-sm sm:text-base font-semibold">
                      MaxTemp
                    </th>
                    <th className="px-4 py-4 text-left text-sm sm:text-base font-semibold">
                      Description
                    </th>

                  </tr>
                </thead>


                <tbody>

                  {weatherinfo.days?.map((day,index) => (

                    
                      <motion.tr
                      className="
                        border-b border-gray-200
                        hover:bg-blue-50
                        transition-colors duration-200
                      "
    key={day.datetime}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 , delay : index * 0.1 }}
  >

                      <td className="px-4 py-4 font-medium text-gray-700 text-center">
                        {day.datetime}
                      </td>

                      <td className="px-4 py-4 font-semibold text-gray-800 text-center">
                        {Math.trunc((day.temp-32)*5/9)}°
                      </td>

                      <td className="px-4 py-4 text-gray-600 text-center">
                        {day.humidity}%
                      </td>

                      <td className="px-4 py-4 text-gray-600 text-center">
                        {day.windspeed}
                      </td>

                      <td className="px-4 py-4 text-gray-600 text-center">
                        {Math.trunc((day.tempmin-32)*5/9)}°
                        
                      </td>

                      <td className="px-4 py-4 text-gray-600 text-center">
                        {Math.trunc((day.tempmax-32)*5/9)}°
                        
                      </td>

                      <td className="px-4 py-4 text-gray-600 text-center">
                        {day.description}
                      </td>

                    </motion.tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default App;