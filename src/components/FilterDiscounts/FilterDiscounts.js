import { useState,useEffect  } from "react";
import PreLoader  from "../Preloader/Preloader";
import MyModal from "../MyModal/MyModal";
import  "./FilterDiscounts.css";

function FilterDiscounts(props){
const keySign = props.keySignState;
  const setDiscounts = props.setDiscounts;
  const setKeySign = props.setKeySign;
console.log("FilterDiscounts rendered");
  const baseUrl = props.baseUrl;
  const formInitialValue = {firmId:-1,discountCategoryId:-1,discountScopeId:-1};
  const [formState,setForm] =   useState(formInitialValue);
  const firmLov   = props.firmLov;
  const discountScopeLov   = props.discountScopeLov;
  const discountCategoryLov   = props.discountCategoryLov;
  const [shouldClickSearchState,setShouldClickSearch] =   useState(false);
const [isPreloaderShownState,setPreloaderShown] = useState(false);
const [modalState,setModal] = useState({isOpen:false,content:null});


const ClearForm = e => {

    setForm(formInitialValue);
    setShouldClickSearch(true);

};
const Search = e => {
  setPreloaderShown(true);
  const searchPromise =    fetch(`${baseUrl}/FilterDiscounts`, {
    method: 'POST', // or 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(formState)
      })
    .then((response) => {
if (!response.ok){
throw new Error(`hata meydana geldi: Status: ${response.status}`)

}
return response.json(); });
searchPromise.then(x => {setDiscounts(x);setKeySign(-1*keySign)}).catch(x => setModal({isOpen:true,content:"hata oldu tekrar deneyiniz"})).finally(x => setPreloaderShown(false))
  

};

const onFormChange = e=> {


if (  e.target.getAttribute("id") === "firmSelect"){

  setForm(prevState => {return {...prevState,firmId: parseInt(e.target.value)};})
}

if (  e.target.getAttribute("id") === "discountCategorySelect"){

  setForm(prevState => {return {...prevState,discountCategoryId: parseInt(e.target.value)};})
}

if (  e.target.getAttribute("id") === "discountScopeSelect"){

  setForm(prevState => {return {...prevState,discountScopeId: parseInt(e.target.value)};})
}

};





useEffect(() => {console.log("FilterDiscounts effect");
 var filterDiscountsDiv =  document.getElementById("filterDiscounts");
 var optionElements = filterDiscountsDiv.getElementsByTagName("option");

 for (let option of optionElements) {
    if (option.getAttribute("class") === "level-2") {

      option.innerHTML=  "&nbsp&nbsp"+ option.innerHTML;
    }
}

if (shouldClickSearchState){
  setShouldClickSearch(false);
document.querySelector("#filterDiscounts").querySelector("#search-button").click();


}
});

const renderedElement = (<div> 
  <h1 style={{textAlign:'center'}}>İndirim Arama</h1>
    <div className="form-element">  
<label>Firma Adı: </label>
<select value={formState.firmState} id="firmSelect">
  <option value="-1"> Hepsi</option>
{firmLov.map(x => {return (<option value={x.id}>{x.name}</option>);})}
  
</select>
</div>

<div className="form-element">  
<label>İndirim Kategorisi: </label>
<select  id="discountCategorySelect" value={formState.discountCategoryId}>
<option value="-1"> Hepsi</option>
{discountCategoryLov.map(x => {return (<option className={"level-" + x.levelNo} value={x.id}>{x.name}</option>);})}

</select>
</div>

<div className="form-element">  
<label>İndirim Kapsamı:  </label>
<select  id="discountScopeSelect" value={formState.discountScopeId}>
<option value="-1"> Hepsi</option>
{discountScopeLov.map(x => {return (<option value={x.id}>{x.name}</option>);})}

</select>
</div>
<div className="clear-fix" style={{clear:"both"}}> 
<button onClick={ClearForm}  style={{float:"right",margin:"0px 10px 10px 10px"}}> Filtreyi Temizle</button>
<button id="search-button" onClick={Search} style={{float:"right",margin:"0px 10px 10px 10px"}}> Ara</button></div>

 
  </div>);
   


    return (
<div onChange={onFormChange} id="filterDiscounts"> 
<MyModal isOpen={modalState.isOpen} closeModal={x => setModal({isOpen:false,content:null})}> {modalState.content}</MyModal>
  <PreLoader isShown={isPreloaderShownState}/>
{renderedElement}



</div>

    );

}


export default FilterDiscounts;