import {List, Datagrid, TextField, DateField, EditButton, DeleteButton, EmailField, NumberField} from "react-admin"
const NetworkList = (props) => {
  return (
    <List {...props} perPage={25}>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="name" />
        {/* <EditButton basePath="/users" />
        <DeleteButton basePath="/users" /> */}
      </Datagrid>
    </List>
  )
}

export default NetworkList
