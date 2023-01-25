import { useNavigate,useParams } from 'react-router-dom'

function TopBar(props){
const userName = props.userName;
const baseUrl = props.baseUrl;
const  navigate = useNavigate(); 

const onLogOut = ()=>{
 var logOutPromise =   fetch(`${baseUrl}/LogOut`, {
        method: "POST", // or 'PUT'
      }).then((response) => {
        if (!response.ok) {
          throw new Error(`hata meydana geldi: Status: ${response.status}`);
        }
        return response.json();
      });
      logOutPromise.then(()=>navigate("/"));
}
    return (<div className="clearfix" style={{background:"rgb(255,28,29)"}}>
<div style={{float :"right"}}> 
        <p>userName: {userName}</p>
        <button>  Profil</button>
        <button onClick={onLogOut }>  Çıkış</button>
        </div>
    </div>);

}

export default TopBar;