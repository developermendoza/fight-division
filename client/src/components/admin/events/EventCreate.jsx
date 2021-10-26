import {Create, SimpleForm, TextInput, DateTimeInput, ReferenceInput, SelectInput ,Datagrid, TextField, DateField, EditButton, DeleteButton, EmailField, NumberField, ReferenceField} from "react-admin"
const EventCreate = (props) => {
  return (
    <Create {...props} >
      <SimpleForm>
        <TextInput source="name" />
        <TextInput source="location" />
        <DateTimeInput source="date" />
        <DateTimeInput source="mainCardTime" />
        <DateTimeInput source="prelimTime" />
        <DateTimeInput source="earlyPrelimTime" />
        <ReferenceInput source="mainCardNetwork" reference="networks">
          <SelectInput source="name"/>
        </ReferenceInput>
        <ReferenceInput source="prelimNetwork" reference="networks">
          <SelectInput source="name"/>
        </ReferenceInput>
        <ReferenceInput source="earlyPrelimNetwork" reference="networks">
          <SelectInput source="name"/>
        </ReferenceInput>
      </SimpleForm>
    </Create>
  )
}

export default EventCreate
