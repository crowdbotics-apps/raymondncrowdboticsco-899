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
    justifyContent: 'center'
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
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkbox: {
    backgroundColor: '#fff',
    borderWidth: 0,
    marginRight: 5,
    padding: 0
  },
  terms: {
    fontSize: 16,
    fontWeight: 'normal'
  },
  termsBtnText: {
    fontSize: 16,
    fontWeight: '600',
    textDecorationLine: 'underline'
  },
  signupBtn: {
    marginTop: 20,
    marginBottom: 10,
    width: 150,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#81A8D2'
  },
  signup: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff'
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
  },
  description: {
    fontSize: 16
  },
  login: {
    fontSize: 18,
    fontWeight: '600'
  },
  title: {
    marginTop: 100,
    fontSize: 18,
    fontWeight: '600'
  },
  resendBtn: {
    marginTop: 20,
    marginBottom: 20
  },
  resend: {
    fontSize: 16,
    textDecorationLine: 'underline'
  }
});
