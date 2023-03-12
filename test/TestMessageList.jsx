import { useNavigation } from "@react-navigation/native";
import React from "react";
import MessagePage from "../components/pages/message/MessagePage";

export default function TestMessagePage(props) {
  const navigation = useNavigation()
  return (
    <MessagePage navigation={navigation} />
  )
}