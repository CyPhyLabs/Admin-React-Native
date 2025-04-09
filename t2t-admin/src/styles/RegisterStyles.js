import { StyleSheet } from 'react-native';

const RegisterStyles = StyleSheet.create({

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
        marginBottom: 7,
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
    registerButton: {
        backgroundColor: '#885053',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 20,
    },
    registerButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loginLinkContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    haveAccountText: {
        color: '#8E8E93',
        fontSize: 14,
    },
    loginLinkText: {
        color: '#885053',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default RegisterStyles;