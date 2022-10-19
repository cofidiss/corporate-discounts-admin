import CategoryListTableRow from "./CategoryListTableRow/CategoryListTableRow";

function CategoryListTable(props) {
    const baseUrl = props.baseUrl;
    const setPreloaderShown = props.setPreloaderShown;
    const setMyModal = props.setMyModal;
const categoryListFromDb = props.categoryListFromDb;

  return (
    <div>
      <table>
        <thead>
          <tr>
     
            <th>Kategori Adı</th>
            <th>PArent Kategori Adı</th>
          </tr>
        </thead>
        <tbody>
{categoryListFromDb.map(x=> {return (<CategoryListTableRow baseUrl={baseUrl}  setMyModal={setMyModal}
setPreloaderShown={setPreloaderShown} categoryFromDb={x}/>);} )}

        </tbody>
      </table>
    </div>
  );
}

export default CategoryListTable;
