import { Container } from "@material-ui/core"
import { Link } from "react-router-dom"

function Logout() {
  return (
    <div style={{marginTop:"200px", height: "400px"}}>
    <Container>
    <h1>Your are now logged out</h1>
      <p style={{color:"grey", fontWeight:"bold"}}>Go <Link style={{color:"white"}} to="/">Home</Link></p>
    </Container>
    </div>
  )
}

export default Logout
