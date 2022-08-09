import { Link } from "react-router-dom"
import  styled  from "styled-components"

const StyledNav = styled.nav`
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}
li {
  float: left;
}
li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}
li a:hover {
  background-color: #111;
}
`

export default function Navbar(){
    return <StyledNav>
        <ul>
            <li>
                <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/chat'>Chat</Link> 
            </li>
        </ul>
    </StyledNav>
}