import { useState,useEffect  } from "react";

function CategoryAddForm(props){
    const setDiscountCategoryLov = props.setDiscountCategoryLov;
    const getDiscountCategoryLov = props.getDiscountCategoryLov;
    const baseUrl = props.baseUrl;
    const setPreloaderShown = props.setPreloaderShown;
    const setMyModal = props.setMyModal;
    const categoryLov = props.categoryLov;
    const [formState,setFormState] = useState({categoryName:"",parentCategoryId:null});
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
     const onAdd = e => {
        setPreloaderShown(true);
        const updatePromise =    fetch(`${baseUrl}/AddCategory`, {
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
        }).then(() => {return getDiscountCategoryLov();},() => {return getDiscountCategoryLov();}).
        then(x=>{
            setDiscountCategoryLov(x); 
            debugger; 
            return null;}).catch(x=> {debugger;
          const modalContent = (<span>{"Categorylovsi çekilemedi"}</span>);
          
          setMyModal({isOpen:true,content:modalContent});}).finally( () => setPreloaderShown(false));   

     }    
    return (<div >
        <p>Kategori ekle</p>
        <label>Kategori Adı</label>
        <input onChange={onFormChange} type="text" id="categoryName" value={formState.categoryName} />
        <label>Parent Kategori Adı</label>
        <select  onChange={onFormChange} id="parentCategoryName" value={formState.parentCategoryId}>
        <option value={""}></option>
{
categoryLov.map(x=> {
return (<option value={x.id}>{x.name}</option>);


}  
    ) }

        </select>
       
        <button onClick={onAdd}>ekle</button>

    </div>);
}

export default CategoryAddForm;