
import { Create, SimpleForm, ReferenceInput, TextInput, SelectInput } from "react-admin"
const PostCreate = props => (
  <Create {...props}>
      <SimpleForm>
        {/* <TextInput source="id" /> */}
          <ReferenceInput source="userId" reference="users">
            <SelectInput optionText="name" />
          </ReferenceInput>
          <TextInput source="title" />
          <TextInput multiline source="body" />
      </SimpleForm>
  </Create>
);

export default PostCreate;