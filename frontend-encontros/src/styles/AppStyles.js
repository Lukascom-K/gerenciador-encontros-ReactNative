import { StyleSheet, Platform } from 'react-native';

const COLORS = {
    BG_DARK: '#121212', 
    BG_SURFACE: '#1E1E1E', 
    TEXT_LIGHT: '#F0F0F0',
    ACCENT_PURPLE: '#9C27B0', 
    ACCENT_LIGHT: '#E1BEE7', 
    ERROR: '#CF6679',
    WARNING: '#FFCC00',
};

export const GlobalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.BG_DARK,
        paddingTop: Platform.OS === 'android' ? 25 : 0,
    },
    containerScroll: {
        flexGrow: 1,
        backgroundColor: COLORS.BG_DARK,
        padding: 20,
    },
});

export const ScreenStyles = StyleSheet.create({
    listTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: COLORS.TEXT_LIGHT,
        textAlign: 'center',
        marginVertical: 15,
    },
    listSubtitle: {
        fontSize: 16,
        color: COLORS.TEXT_LIGHT,
        textAlign: 'center',
    },
    formTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.ACCENT_PURPLE,
        textAlign: 'center',
        marginBottom: 20,
    },
    detailTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: COLORS.TEXT_LIGHT,
        textAlign: 'center',
        marginBottom: 10,
    },
});

export const ComponentStyles = StyleSheet.create({
    input: {
        width: '100%',
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: COLORS.ACCENT_PURPLE,
        borderRadius: 5,
        backgroundColor: COLORS.BG_SURFACE,
        height: 40,
        color: COLORS.TEXT_LIGHT,
    },
    inputArea: {
        width: '100%',
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: COLORS.ACCENT_PURPLE,
        borderRadius: 5,
        backgroundColor: COLORS.BG_SURFACE,
        minHeight: 100,
        textAlignVertical: 'top',
        color: COLORS.TEXT_LIGHT,
    },
    
    listagemItemCard: {
        backgroundColor: COLORS.BG_SURFACE,
        padding: 15,
        borderRadius: 8,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: COLORS.ACCENT_PURPLE,
        width: '100%',
    },
    listagemItemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.TEXT_LIGHT,
        marginBottom: 5,
    },
    listagemItemDetail: {
        fontSize: 14,
        color: COLORS.TEXT_LIGHT,
        marginBottom: 10,
    },
    listagemButtonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    listagemList: {
        width: '100%',
        marginTop: 15,
        paddingHorizontal: 10,
    },
    listagemEmptyText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: COLORS.ACCENT_LIGHT,
    },
    
    detalhesCard: {
        backgroundColor: COLORS.BG_SURFACE,
        padding: 20,
        borderRadius: 8,
        marginVertical: 15,
        borderWidth: 1,
        borderColor: COLORS.ACCENT_PURPLE,
        width: '100%',
    },
    detalhesSubtitle: {
        fontSize: 18,
        color: COLORS.ACCENT_LIGHT,
        marginBottom: 10,
        textAlign: 'center',
    },
    detalhesLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.ACCENT_PURPLE,
        marginTop: 10,
    },
    detalhesText: {
        fontSize: 16,
        color: COLORS.TEXT_LIGHT,
        marginBottom: 10,
        lineHeight: 22,
    },
    detalhesButtonContainer: {
        marginTop: 15,
        width: '100%',
        paddingHorizontal: 10,
    },
    
    errorText: {
        color: COLORS.ERROR,
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    pickerContainer: {
        width: '100%',
        alignSelf: 'center',
        marginVertical: 10,
        borderWidth: 1,
        borderColor: COLORS.ACCENT_PURPLE,
        borderRadius: 5,
        backgroundColor: COLORS.BG_SURFACE,
        height: 50,
        justifyContent: 'center',
    },
    picker: {
        height: 50,
        width: '100%',
        color: COLORS.TEXT_LIGHT, 
    },
datePickerContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        marginVertical: 10,
        backgroundColor: COLORS.BG_SURFACE,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.ACCENT_PURPLE,
    },
    datePickerLabel: {
        color: COLORS.TEXT_LIGHT,
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
    },
});

export const ThemeColors = COLORS;