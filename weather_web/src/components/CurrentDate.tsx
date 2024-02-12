import { useEffect, useState } from "react"

const CurrentDate = () => {
  const [currentHour, setCurrentHour] = useState<string>("");

  useEffect(() => {
    const updateCurrentHour = () => {
      const newCurrentHour = new Date().toLocaleTimeString();
      setCurrentHour(newCurrentHour)
    };

    const intervalid = setInterval(updateCurrentHour, 1000);

    return () => clearInterval(intervalid);
  },[])

  return(
    <div>
      <h1 style={{color: "#fff"}}>현재시간: {currentHour}</h1>
    </div>
  )
}

export default CurrentDate