import { StyleSheet, Dimensions } from 'react-native';

const dm = Dimensions.get('screen');
export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  logo: {
    marginTop: 100,
    width: dm.width * 0.6,
    height: dm.width * 0.2
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 100
  },
  input: {
    width: dm.width * 0.8,
    height: 50,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 20
  },
  resetBtn: {
    marginTop: 50,
    width: 200,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#81A8D2'
  },
  reset: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff'
  }
});
