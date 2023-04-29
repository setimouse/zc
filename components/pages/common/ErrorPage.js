import { Image, View } from "react-native";

export const ErrorType = {
  NoData: { source: require('../../../assets/nodata.png') },
  NetworkError: { source: require('../../../assets/network_error.png') },
}

export default function ErrorPage({ type }) {
  return (
    <View style={{ paddingHorizontal: 12, flex: 1, }}>
      <Image source={type.source} style={{ flex: .618, resizeMode: 'contain', width: '100%', }} />
    </View>
  )
}