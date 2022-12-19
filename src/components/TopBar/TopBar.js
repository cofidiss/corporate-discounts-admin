import { useNavigate,useParams } from 'react-router-dom'

function TopBar(props){
const userName = props.userName;

const  navigate = useNavigate(); 
    return (<div className="clearfix" style={{background:"rgb(255,28,29)"}}>
<div style={{float :"right"}}> 
        <p>userName: {userName}</p>
        <button>  Profil</button>
        <button onClick={x =>navigate("/") }>  Çıkış</button>
        </div>
    </div>);

}

export default TopBar;