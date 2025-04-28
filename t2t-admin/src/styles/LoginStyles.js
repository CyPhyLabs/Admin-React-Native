import { StyleSheet } from 'react-native';


const LoginStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D7E3F1',
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#637D92',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#8E8E93',
        marginBottom: 30,
    },
    input: {
        backgroundColor: '#F9F9F9',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        color: 'black',
        marginBottom: 15,
    },
    forgotPassword: {
        color: '#885053',
        textAlign: 'right',
        marginBottom: 20,
    },
    loginButton: {
        backgroundColor: '#885053',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    footerText: {
        color: '#8E8E93',
        fontSize: 14,
    },
    footerLink: {
        color: '#885053',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default LoginStyles;