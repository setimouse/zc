import { Image, View } from "react-native";

export const ErrorType = {
  NoData: { source: require('../../../assets/nodata.png') },
  NetworkError: { source: require('../../../assets/network_error.png') },
}

export default function ErrorPage({ type, style }) {
  return (
    <View style={[{ paddingHorizontal: 12, width: '100%' }, style]}>
      <Image source={type.source} style={{ flex: 1, resizeMode: 'contain', maxWidth: 351, aspectRatio: 1, maxHeight: 380, }} />
    </View>
  )
}