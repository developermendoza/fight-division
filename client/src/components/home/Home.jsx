import LandingHero from "../hero/LandingHero"
import TabNavbar from "../tabnavbar/TabNavbar"
import UpcomingEvent from "../events/UpcomingEvent";
import Matches from "../matches/Matches";
import { getUpcomingEvent } from '../../actions/events';
import { getMatchesByEventId } from '../../actions/matches';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from "react";

function Home() {
  const dispatch = useDispatch();
  const upcomingEvent = useSelector(state => state.events.data)
  const matches = useSelector(state => state.matches.data);
  const [ mainEvent, setMainEvent ] = useState()

  const getMainEvent = (matches) => {

    if(matches && matches.length > 0){
      const mainEvent = matches.find( match => match.isMainEvent === true );
     return mainEvent
    }
  }

  useEffect(() => {
    dispatch(getUpcomingEvent());
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
    </div>
  )
}

export default Home;
