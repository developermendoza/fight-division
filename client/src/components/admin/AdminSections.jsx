import React from 'react'
import {
  useParams,
} from "react-router-dom";
import Matches from './matches/Matches';
import Events from './events/Events';
import Fighters from './fighters/Fighters';


function AdminSections() {

  let { adminSection } = useParams();

  return (
    <>
      {adminSection === "events" && <Events />} 
      {adminSection === "fighters" && <Fighters />} 
      {adminSection === "matches" && <Matches />} 
    </>
  )
}

export default AdminSections
