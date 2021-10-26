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
  const upcomingEvent = useSelector(state => state.events)
  const matches = useSelector(state => state.matches);
  const toptenUsers = useSelector(state => state.users.data);
  const [ mainEvent, setMainEvent ] = useState({})
  const [event, setEvent ] = useState({});

  const getMainEvent = (matches) => {

    if(matches && matches.length > 0){
      const mainEvent = matches.find( match => match.isMainEvent === true ? match : null );
     return mainEvent
    }
  }

  useEffect(() => {
    dispatch(getUpcomingEvent());
    dispatch(getTopTenUsers())
  }, [dispatch])

  useEffect(() => {
    if(upcomingEvent.data){
      dispatch(getMatchesByEventId(upcomingEvent.data.id))
      setEvent(upcomingEvent.data)
    }
  },[dispatch, upcomingEvent])

  useEffect(() => {
    if(matches.data){
      const mainEvent =  getMainEvent(matches.data)
      setMainEvent(mainEvent)
    }
  }, [matches])
  // console.log("mainEvent: ", mainEvent)
  return (
    <div>
      <LandingHero mainEvent={mainEvent}/>
      <UpcomingEvent 
      upcomingEventLoading={upcomingEvent.fetchInProgress} upcomingEvent={event} 
      mainEvent={mainEvent}
      mainEventLoading={matches.fetchInProgress}
       />
      <Matches matches={matches}/>
      <Banner />
      <Leaderboard toptenUsers={toptenUsers} />
    </div>
  )
}

export default Home;
