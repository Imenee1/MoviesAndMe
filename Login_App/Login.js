import React ,{useEffect }  from 'react';
import { 
    View, Text, TouchableOpacity, TextInput,Platform, StyleSheet , StatusBar, Alert,Image
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from 'react-native-paper';
import Users from '../Users/users';


const Login = ({navigation}) => {

   const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

 

    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });
    
    const { colors } = useTheme();
  

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
              if( userName == item.username && password == item.password) 
              {
                   navigation.navigate("Search");
              }
             
        });
       

        if ( data.username.length == 0 || data.password.length == 0 ) {
            Alert.alert('Erreur de saisie!', 'Veuillez remplir tous les champs.', [
                {text: 'D\'accord'}
            ]);
            return;
        }
    }
 
    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#010a4f' barStyle="light-content"/>
        
        <View style={styles.header}>
        <View style={styles.container1}>
        <Image
            source={require("../assets/bg_1.jpg")}
            resizeMode="contain"
            style={styles.image}
          ></Image>
        </View>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
        >
            <Text style={[styles.text_footer, {
                color: colors.text
            }]}>Nom d'Utilisateur :</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user"
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
                        name="check-square"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            { data.isValidUser ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Le nom d'utilisateur doit comporter au minimum 4 caractères.
</Text>
            </Animatable.View>
            }
            

            <Text style={[styles.text_footer, {
                color: colors.text,
                marginTop: 35
            }]}>Mot de passe</Text>
            <View style={styles.action}>
                <Feather 
                    name="key"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Mot de passe"
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
            <Text style={styles.errorMsg}>Le mot de passe doit comporter au minimum 8 caractères.</Text>
            </Animatable.View>
            }
            

            <TouchableOpacity>
               
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
      backgroundColor: '#010a4f'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 10,
        paddingBottom: 130
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
      
   
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
        color: '#010a4f',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#010a4f',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#CD5C5C',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#010a4f',
    },
    errorMsg: {
        color: '#CD5C5C',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    image:{
        width: 620,
    height: 285,
        transform: [
          {
            rotate: "0.00deg"
          }
        ],
        
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
        height:40,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        width: '100%',
        textAlign:"center",
        backgroundColor:'#010a4f',
        color:'#fff',
        fontSize:20,
        top :10,
       opacity:0.8,
 

    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover'
      },
      container1: {
        width: 600,
        height: 285,
        flex:1
      },
  });