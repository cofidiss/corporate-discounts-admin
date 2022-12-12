import { Children } from "react";
import { Navigate ,useLocation} from 'react-router-dom'

function ConditionalRoute(props){
debugger;
const currentUserState = props.currentUserState;
let location = useLocation();
const children = props.children;
let renderedElement;
if(currentUserState === null){
    renderedElement = null;
}
if(currentUserState !== null && currentUserState.isAdmin === true){
    renderedElement = children;
}
if(currentUserState !== null && currentUserState.isAdmin === false){

   let currentpage =  location.pathname;
    renderedElement = (<Navigate to={"/login" + currentpage } replace />)
}
return (<div> {renderedElement}</div>);


}

export default ConditionalRoute;