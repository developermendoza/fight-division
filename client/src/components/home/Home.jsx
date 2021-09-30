import LandingHero from "../hero/LandingHero"
import TabNavbar from "../tabnavbar/TabNavbar"
import UpcomingEvent from "../events/UpcomingEvent";
import Matches from "../matches/Matches";
import { getUpcomingEvent } from '../../actions/events';
import { getMatchesByEventId } from '../../actions/matches';
import { getTopTenUsers } from "../../actions/users";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from "react";
import Banner from "./Banner";
import Leaderboard from "../leaderboard/Leaderboard";

function Home() {
  const dispatch = useDispatch();
  const upcomingEvent = useSelector(state => state.events.data)
  const matches = useSelector(state => state.matches.data);
  const toptenUsers = useSelector(state => state.users.data);
  const [ mainEvent, setMainEvent ] = useState()

  const getMainEvent = (matches) => {

    if(matches && matches.length > 0){
      const mainEvent = matches.find( match => match.isMainEvent === true );
     return mainEvent
    }
  }

  useEffect(() => {
    dispatch(getUpcomingEvent());
    dispatch(getTopTenUsers())
  }, [dispatch])

  useEffect(() => {
    if(upcomingEvent){
      dispatch(getMatchesByEventId(upcomingEvent.id))
    }

  },[dispatch, upcomingEvent])

  useEffect(() => {
    if(matches){
      const mainEvent = getMainEvent(matches)
      setMainEvent(mainEvent)
    }
  }, [matches])

  return (
    <div>
      <TabNavbar />
      <LandingHero />
      <UpcomingEvent upcomingEvent={upcomingEvent} mainEvent={mainEvent} />
      <Matches matches={matches}/>
      <Banner />
      <Leaderboard toptenUsers={toptenUsers} />
    </div>
  )
}

export default Home;
