import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import * as Yup from "yup";

import { AppForm, SubmitButton, AppFormField } from "../components/forms";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Company Name"),
  email: Yup.string().label("Email"),
  phone: Yup.string().label("Phone"),
});

function CompanyFormScreen(props) {
  return (
    <View style={styles.container}>
      <ScrollView>
        <AppForm
          initialValues={{
            name: "",
            email: "",
            phone: "",
          }}
          onSubmit={(values) => console.log(values)}
          validationSchema={validationSchema}
        >
          <AppFormField
            name="name"
            placeholder="Company Name"
            maxLength={100}
            autoFocus
            icon="city-variant-outline"
          />
          <AppFormField
            name="email"
            placeholder="Email"
            maxLength={100}
            icon="account"
            keyboardType="email-address"
          />
          <AppFormField
            name="phone"
            placeholder="Phone"
            icon="phone"
            keyboardType="phone-pad"
          />
          <SubmitButton title="Save" />
        </AppForm>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    fontWeight: "bold",
  },
});

export default CompanyFormScreen;
