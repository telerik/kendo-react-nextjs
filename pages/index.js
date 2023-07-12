import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import '@progress/kendo-theme-default/dist/all.css';
import data from '../data/products.json'
import { useState } from 'react';
import { process } from '@progress/kendo-data-query'

export default function Index() {
  const [gridData, setGridData] = useState(data);
  const [dataState, setDataState] = useState({ skip: 0, take: 20 });
  const [editID, setEditID] = useState(1);
  const handleDataStateChange = (e) => {
      setDataState(e.data)
  }
  const handleRowClick = (e) => {
      setEditID(e.dataItem.ProductID)
  }
  const handleItemChange = (e) => {
      const data = gridData.slice();
      const index = gridData.findIndex(d => d.ProductID === e.dataItem.ProductID);
      data[index] = { ...data[index], [e.field]: e.value };
      setGridData(data)
  }
  const dataInEdit = process(gridData, dataState).data

  return (
    <div>
        <Grid data={dataInEdit.map((item) => {
                item.inEdit = item.ProductID === editID
                return item
            })}
            pageable
            filterable
            sortable
            onDataStateChange={handleDataStateChange}
            editField="inEdit"
            onRowClick={handleRowClick}
            onItemChange={handleItemChange}
            total={data.length}
            {...dataState}>
            <Column field="ProductID" title="ID" filterable={false} editable={false}/>
            <Column field="ProductName" title="Name" />
            <Column field="UnitPrice" title="Price" filter='numeric' editor='numeric' />
            <Column field="UnitsInStock" title="In stock" filter='numeric'  editor='numeric' />
        </Grid>
    </div>
  )
}
