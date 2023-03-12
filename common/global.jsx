import IconBack from '../assets/back.png';

const headBar = (options) => {
  return Object.assign({
    headerTitleStyle: { color: '#FFFFFF' },
    headerStyle: { backgroundColor: '#2882FF' },
    statusBarColor: '#2882FF',
    headerBackImageSource: IconBack,
    headerTitleAlign: "center",
    headerBackTitleVisible: false,
    headerTintColor: '#fff',

  }, options);
};

export default headBar;
