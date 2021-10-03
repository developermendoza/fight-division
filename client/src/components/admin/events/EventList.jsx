import {List, Datagrid, TextField, DateField, EditButton, DeleteButton, EmailField, NumberField, ReferenceField} from "react-admin"
const EventList = (props) => {
  return (
    <List {...props} >
      <Datagrid>
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="location" />
        <DateField source="date" />
        <DateField source="mainCardTime" />
        <DateField source="prelimTime" />
        <DateField source="earlyPrelimTime" />
        <DateField source="createdAt" />
        <TextField source="updatedAt" />
        <TextField source="mainCardNetwork.name" />
        <TextField source="earlyPrelimNetwork.name" />
        <TextField source="prelimNetwork.name" />
        {/* <ReferenceField source="_id" reference="networks"><TextField source="name" /></ReferenceField> */}
        {/* <TextField source="name" />
        <TextField source="location" />
        <TextField source="venue" />
        <DateField source="date" />
        <DateField source="mainCardTime" />
        <DateField source="prelimTime" />
        <DateField source="earlyPrelimTime" />
        <DateField source="createdAt" />
        <TextField source="updatedAt" />
        <ReferenceField source="earlyPrelimNetwork" reference="networks"><TextField source="earlyPrelimNetwork.name" /></ReferenceField>
        <ReferenceField source="mainCardNetwork" reference="networks"><TextField source="id" /></ReferenceField>
        <TextField source="organization" />
        <ReferenceField source="prelimNetwork" reference="networks"><TextField source="id" /></ReferenceField>
        <TextField source="id" /> */}
      </Datagrid>
    </List>
  )
}

export default EventList
