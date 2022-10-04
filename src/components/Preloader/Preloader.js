import  "./Preloader.css";


function Preloader(props){
    const isShown = props.isShown;
 
    return (<div className={isShown ? "preloader" : "preloader hidden"}  > </div>);


}

export default Preloader;