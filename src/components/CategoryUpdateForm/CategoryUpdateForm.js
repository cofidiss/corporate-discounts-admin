
import { useState,useEffect  } from "react";
function CategoryUpdateForm(props){
const baseUrl = props.baseUrl;
const setPreloaderShown = props.setPreloaderShown;
const setMyModal = props.setMyModal;
const categoryFromDb = props.categoryFromDb;
const categoryLov = props.categoryLov;
const [formState,setFormState] = useState({id:categoryFromDb.id,categoryName:categoryFromDb.categoryName,parentCategoryId:categoryFromDb.parentCategoryId});
debugger;
console.log(formState);
const onFormChange = e => {

    if (e.target.getAttribute("id") === "categoryName") {
        setFormState ( prevState =>{return {...prevState,categoryName:e.target.value}})

    }    


    if (e.target.getAttribute("id") === "parentCategoryName") {
   var parentCategoryId = e.target.value === "" ? null: e.target.value;
        setFormState ( prevState =>{return {...prevState,parentCategoryId:parentCategoryId}})

    }     

}
const onUpdate = e => {
    setPreloaderShown(true);
    const updatePromise =    fetch(`${baseUrl}/UpdateCategory`, {
        method: 'POST', // or 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(formState)
          })
        .then((response) => {
    if (!response.ok){
   return response.text().then(x =>  Promise.reject(x));
    
    }
    return response.text(); });

    updatePromise.then(x =>{
const modalContent = (<span>{x}</span>);

setMyModal({isOpen:true,content:modalContent});
        
    }).catch(x=>{
        debugger;
        const modalContent = (<span>{x}</span>);
        setMyModal({isOpen:true,content:modalContent});
    }).finally( () => setPreloaderShown(false));
}

    return (<div >
        <label>Kategori Adı</label>
        <input onChange={onFormChange} type="text" id="categoryName" value={formState.categoryName} />
        <label>Parent Kategori Adı</label>
        <select  onChange={onFormChange} id="parentCategoryName" value={formState.parentCategoryId}>
        <option value={null}></option>
{
categoryLov.map(x=> {if (categoryFromDb.id !== x.id){
return (<option value={x.id}>{x.name}</option>);
}
}  
    ) }

        </select>
       
        <button onClick={onUpdate}>Güncelle</button>
    </div>);

}

export default CategoryUpdateForm;