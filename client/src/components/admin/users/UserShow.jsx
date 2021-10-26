import {Show, SimpleShowLayout, TextField, DateField, EmailField} from "react-admin"
const UserShow = props => (
  <Show {...props}>
      <SimpleShowLayout>
          <TextField source="id" />
          <EmailField source="email" />
          <TextField source="username" />
          <TextField source="password" />
          <DateField source="rank" />
          <DateField source="matchOutcomePoints" />
          <DateField source="roundTotalPoints" />
          <DateField source="matchTotalPoints" />
          <DateField source="totalPoints" />
          <TextField source="updatedAt" />
          <DateField source="createdAt" />
          <TextField source="id" />
      </SimpleShowLayout>
  </Show>
);

export default UserShow 