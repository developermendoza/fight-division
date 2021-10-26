import {List, Datagrid, TextField, DateField, EditButton, DeleteButton, EmailField, NumberField} from "react-admin"
const UserList = (props) => {
  return (
    <List {...props} perPage={25}>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <EmailField source="email" />
        <TextField source="username" />
        <NumberField source="rank" />
        <NumberField source="matchOutcomePoints" />
        <NumberField source="roundTotalPoints" />
        <NumberField source="matchTotalPoints" />
        <NumberField source="totalPoints" />
        <TextField source="updatedAt" />
        <DateField source="createdAt" />
        <EditButton basePath="/users" />
        <DeleteButton basePath="/users" />
      </Datagrid>
      {/* <Datagrid rowClick="edit">
          <TextField source="id" />
          <TextField source="name" />
          <TextField source="username" />
          <EmailField source="email" />
          <TextField source="address.street" />
          <TextField source="phone" />
          <TextField source="website" />
          <TextField source="company.name" />
          <EditButton basePath="/users" />
      </Datagrid> */}
    </List>
  )
}

export default UserList
