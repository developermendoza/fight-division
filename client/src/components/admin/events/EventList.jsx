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
        {/* <ReferenceField source="mainCardNetwork" reference="networks">
          <TextField source="name" />
        </ReferenceField> */}
        <TextField source="mainCardNetwork.name" label="Maincard Network" />
        <TextField source="prelimNetwork.name" label="Prelim Network" />
        <TextField source="earlyPrelimNetwork.name" label="Early Prelim Network" />
        <TextField source="organization.name" label="Organization" />
        <DateField source="createdAt" />
        <TextField source="updatedAt" />
      </Datagrid>
    </List>
  )
}

export default EventList
