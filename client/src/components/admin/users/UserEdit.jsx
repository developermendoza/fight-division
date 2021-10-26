import {SimpleForm, TextInput, PasswordInput, Edit, NumberInput} from "react-admin"
const UserEdit = (props) => {
  return (
    <Edit title="Edit a User" {...props}>
      <SimpleForm>
        <TextInput disabled source="id" />
        <TextInput source="email" />
        <TextInput source="username" />
        {/* <TextInput source="matchOutcomePoints" />
        <TextInput source="roundTotalPoint" />
        <TextInput source="matchTotalPoints" />
        <TextInput source="totalPoints" /> */}
        <NumberInput source="matchOutcomePoints" />
        <NumberInput source="roundTotalPoints" />
        <NumberInput source="matchTotalPoints" />
        <NumberInput source="totalPoints" />
        <PasswordInput source="password" />
      </SimpleForm>
    </Edit>
  )
}

export default UserEdit
