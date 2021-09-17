import {SimpleForm, TextInput, PasswordInput, Edit} from "react-admin"
const UserEdit = (props) => {
  return (
    <Edit title="Edit a User" {...props}>
      <SimpleForm>
        <TextInput disabled source="id" />
        <TextInput source="email" />
        <TextInput source="username" />
        <PasswordInput source="password" />
      </SimpleForm>
    </Edit>
  )
}

export default UserEdit
