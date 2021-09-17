import LandingHero from "../hero/LandingHero"
import TabNavbar from "../tabnavbar/TabNavbar"
import UpcomingEvent from "../events/UpcomingEvent";
import Matches from "../matches/Matches";

let upcomingEvent = {
  id:"1",
  name : "ufc 266",
  date: "2021-09-25T07:00:00.000+00:00",
  location:"Las Vegas, NV United States",
  venue:"UFC Apex",
  mainCardTime:"2021-09-25T19:00:00.000Z",
  prelimCardTime:"2021-09-25T17:00:00.000Z",
  earlyPrelimCardTime:"2021-09-25T15:00:00.000Z",
  fighter1:{
    firstName:"Brian",
    lastName:"Ortega",
    nickname:"T-City",

  },
  fighter2:{
    firstName:"Alexander",
    lastName:"Volkanovski",
    nickname:"The Great"
  }
}
function Home() {
  return (
    <div>
      <TabNavbar />
      <LandingHero />
      <UpcomingEvent upcomingEvent={upcomingEvent} />
      <Matches eventId={upcomingEvent.id}/>
    </div>
  )
}

export default Home
