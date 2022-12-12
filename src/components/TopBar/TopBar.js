

function TopBar(props){
const userName = props.userName;


    return (<div className="clearfix">
<div style={{float :"right"}}> 
        <p>userName: {userName}</p>
        <button>  Çıkış</button>
        </div>
    </div>);

}

export default TopBar;