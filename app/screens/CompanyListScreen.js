import React, { useState } from "react";
import { FlatList } from "react-native";

import ListItemSeparator from "../components/ListItemSeparator";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
//import AddTaskButton from "../components/AddTaskButton";
import CompanyFormScreen from "./CompanyFormScreen";
import EmployeeListItem from "../components/EmployeeListItem";

const initialClients = [
  {
    id: 1,
    name: "Company 1",
    email: "Person 1",
    phone: "6568646",
  },
  {
    id: 2,
    name: "Company 2",
    email: "Person 2",
    phone: "6568646",
  },
  {
    id: 3,
    name: "Company 3",
    email: "Person 3",
    phone: "6568646",
  },
];
function ClientsListScreen({ navigation }) {
  const [clients, setclients] = useState(initialClients);
  const [refreshing, setRefreshing] = useState(false);

  const handleDelete = (client) => {
    setclients(clients.filter((c) => c.id !== client.id));
  };

  return (
    <>
      <CompanyFormScreen />
      <FlatList
        data={clients}
        keyExtractor={(client) => client.id.toString()}
        renderItem={({ item }) => (
          <EmployeeListItem
            name={item.name}
            email={item.email}
            phone={item.phone}
            onPress={() => console.log("Project Selected", item)}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => {
          setclients([
            {
              id: 2,
              name: "Company 2",
              email: "Person 2",
              phone: "6568646",
            },
          ]);
        }}
      />
      {/* <AddTaskButton onPress={() => navigation.navigate("CompanyForm")} /> */}
    </>
  );
}

export default ClientsListScreen;
