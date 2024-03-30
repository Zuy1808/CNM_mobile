import React, { useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import authService from '../services/authService';
import { useAuth } from '../provider/AuthProvider';

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const { setUserVerified, userVerified } = useAuth();

    console.log("user",userVerified);

    useEffect(() => {
        if (userVerified) {
            navigation.navigate('ChatList');
        } else {
            navigation.navigate('Login');
        }
    }, [userVerified])

    const handleLogin = () => {
        // Ví dụ: fetch('/api/login', {
    //     method: 'POST',
    //     body: JSON.stringify({ email, password }),
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // }).then(response => {
    //     if (response.ok) {
    //         // Xử lý khi đăng nhập thành công, ví dụ: chuyển hướng người dùng đến màn hình chính
    //         // Ví dụ: navigation.navigate('HomeScreen');
    //     } else {
    //         // Xử lý khi đăng nhập thất bại, ví dụ: hiển thị thông báo lỗi
    //         alert('Tên người dùng hoặc mật khẩu không chính xác.');
    //     }
    // }).catch(error => {
    //     // Xử lý khi có lỗi xảy ra trong quá trình đăng nhập
    //     console.error('Lỗi đăng nhập:', error);
    // });
    };

    const handleForgotPassword = () => {
        //navigation.navigate('ForgotPasswordScreen');
    };

    const handleSignUp = () => {
        navigation.navigate('Signup');
    };

    const handleSignIn = async () => {
      setLoading(true);
      try {
        const result = await authService.login(email, password);

        if (result.user.verify) {
            // toast.success('Login successful');
            setUserVerified(result.user);
        } else {
            // toast.error(result.message);
            console.log(result.message);
        }
    } catch (error) {
        // toast.error(
        //     error.response.data.message ||
        //         'An error occurred. Please try again.',
        // );
        console.log(error);
    } finally {
        setLoading(false);
    }
  };

    return (
      <LinearGradient
      colors={['#A44C89' ,'#4F4F4F', '#545AC8', '#00BCD4']}
      style={styles.container}
    >
      <View style={styles.formContainer}>
        <Text style={styles.title}>Đăng nhập</Text>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#ccc"
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder="Mật khẩu"
          placeholderTextColor="#ccc"
          secureTextEntry={true}
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
          <Text style={styles.buttonText}>Đăng nhập</Text>
          )}
        </TouchableOpacity>
        <View style={styles.linkContainer}>
          <TouchableOpacity>
            <Text style={styles.link}>Quên mật khẩu?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={styles.link}>Chưa có tài khoản? Đăng ký ngay</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#00BCD4',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  link: {
    color: 'black',
    fontSize: 16,
  },
});

export default LoginScreen;
