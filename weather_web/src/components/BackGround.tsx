import styled from "styled-components"
import Main from "./Main"

interface BackProps {
  isMorning: boolean
}

const BackGround = () => {
  const getCurrentHour = () => {
    const currentHour = new Date().getHours();
    return currentHour;
  }
  const isMorning = () => {
    const currentHouer = getCurrentHour();
    return currentHouer >= 5 && currentHouer < 17;
  };

  return(
    <Back isMorning={isMorning()}>
      <Main />
    </Back>
  )
}

export default BackGround

const Back = styled.div<BackProps>`
   background: ${(props) =>
    props.isMorning
      ? "linear-gradient(to right, #e1eec3, #f05053)"
      : "linear-gradient(to right, #001848, #29323c)"};
  width: 100vw;
  height: 100vh;
`