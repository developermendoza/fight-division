import {List, Datagrid, TextField, DateField, EditButton, DeleteButton, EmailField, NumberField} from "react-admin"
const UserList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
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
    </List>
  )
}

export default UserList
