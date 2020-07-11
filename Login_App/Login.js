import React ,{useContext ,useEffect }  from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert,
    a
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AuthContext from './context';
import { useTheme } from 'react-native-paper';
import Users from '../Users/users';
import AsyncStorage from '@react-native-community/async-storage';

const SignInScreen = ({navigation}) => {

   // const AuthContext =React.createContext();
   
   const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  //const { params } = navigation.state

    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });

    const { colors } = useTheme();
  // const { signIn } = React.useContext(AuthContext);

    const textInputChange = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if( val.trim().length >= 8 ) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidUser = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }
   
    const loginHandle = (userName, password)  =>{

        var var1= false;
        const foundUser = Users.filter( item => {
              return userName == item.username && password == item.password ;
           
        });
        
             

        if ( data.username.length == 0 || data.password.length == 0 ) {
            Alert.alert('Entrée erronée!', 'Nom d\'utilisateur ou mot de passe ne doit pas être vide.', [
                {text: 'Okay'}
            ]);
            return;
        }

        if ( foundUser.length == 0 ) {
            Alert.alert('Utilisateur invalide!', 'Utilisateur ou mdp erronné.', [
                {text: 'Okay'}
            ]);
            return;
        }
     //   navigation.navigate('Navigation');
      
    }
    const loginReducer = (prevState, action) => {
        switch( action.type ) {
          case 'RETRIEVE_TOKEN': 
            return {
              ...prevState,
              userToken: action.token,
              isLoading: false,
            };
          case 'LOGIN': 
            return {
              ...prevState,
              userName: action.id,
              userToken: action.token,
              isLoading: false,
            };
          case 'LOGOUT': 
            return {
              ...prevState,
              userName: null,
              userToken: null,
              isLoading: false,
            };
          case 'REGISTER': 
            return {
              ...prevState,
              userName: action.id,
              userToken: action.token,
              isLoading: false,
            };
        }
      };
    
      const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);
    
      const authContext = React.useMemo(() => ({
        signIn: async(foundUser) => {
          // setUserToken('fgkj');
          // setIsLoading(false);
          const userToken = String(foundUser[0].userToken);
          const userName = foundUser[0].username;
          
          try {
            await AsyncStorage.setItem('userToken', userToken);
          } catch(e) {
            console.log(e);
          }
          // console.log('user token: ', userToken);
          dispatch({ type: 'LOGIN', id: userName, token: userToken });
        },
        signOut: async() => {
          // setUserToken(null);
          // setIsLoading(false);
          try {
            await AsyncStorage.removeItem('userToken');
          } catch(e) {
            console.log(e);
          }
          dispatch({ type: 'LOGOUT' });
        },
        signUp: () => {
          // setUserToken('fgkj');
          // setIsLoading(false);
        },
        toggleTheme: () => {
          setIsDarkTheme( isDarkTheme => !isDarkTheme );
        }
      }), []);
    
      useEffect(() => {
        setTimeout(async() => {
          // setIsLoading(false);
          let userToken;
          userToken = null;
          try {
            userToken = await AsyncStorage.getItem('userToken');
          } catch(e) {
            console.log(e);
          }
          // console.log('user token: ', userToken);
          dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
        }, 1000);
      }, []);

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#57A0D3' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Bienvenue!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
        >
            <Text style={[styles.text_footer, {
                color: colors.text
            }]}>Utilisateur</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Nom d'Utilisateur"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                    onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                />
                {data.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            { data.isValidUser ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Le nom d'utilisateur doit comporter 4 caractères.
</Text>
            </Animatable.View>
            }
            

            <Text style={[styles.text_footer, {
                color: colors.text,
                marginTop: 35
            }]}>Mot de passe</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Votre mdp"
                    placeholderTextColor="#666666"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            { data.isValidPassword ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Le mot de passe doit comporter 8 caractères.</Text>
            </Animatable.View>
            }
            

            <TouchableOpacity>
                <Text style={{color: '#57A0D3', marginTop:15}}>Mot de passe oublié</Text>
            </TouchableOpacity>
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {loginHandle( data.username, data.password )}}
                >
               <Text style={styles.Connect}  colors={['#08d4c4', '#01ab9d']} > SE CONNECTER
             
                  </Text>
                    </TouchableOpacity>


            </View>
        </Animatable.View>
      </View>
    );
};

export default Login;
const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#57A0D3'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30,
        textAlign:"center"
        
    },
    text_footer: {
        color: '#57A0D3',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#0E4D92',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#57A0D3',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },Connect:{
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        textAlign:"center",
        backgroundColor:'#57A0D3',
        color:'#fff',
        fontSize:20,
        top :2,
        textAlign:"center",
        alignSelf: "center"
    }
  });