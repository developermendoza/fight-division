import {Create, SimpleForm, TextInput, PasswordInput} from "react-admin"
const UserCreate = (props) => {
  return (
    <Create title="Add a User" {...props}>
      <SimpleForm>
        <TextInput source="email" />
        <TextInput source="username" />
        <PasswordInput source="password" />
      </SimpleForm>
    </Create>
  )
}

export default UserCreate
