import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';

import { API_BASE_URL } from '../config.js'; 
import { GlobalStyles, ScreenStyles, ComponentStyles, ThemeColors } from '../styles/AppStyles'; 

const API_URL = `${API_BASE_URL}/servicos`;

const Home = ({ navigation }) => {
    const [carregando, setCarregando] = useState(true);
    const [locais, setLocais] = useState([]);
    const [eventosDoDia, setEventosDoDia] = useState([]);
    const [dataSelecionada, setDataSelecionada] = useState(new Date().toISOString().split('T')[0]); 
    const [markedDates, setMarkedDates] = useState({});

    const buscarLocais = useCallback(async () => {
        setCarregando(true);
        try {
            const response = await axios.get(API_URL);
            const dadosLocais = response.data;
            setLocais(dadosLocais);

            const marcacoes = {};
            dadosLocais.forEach(local => {
                const data = local.data; 
                if (data) {
                    marcacoes[data] = {
                        marked: true,
                        dotColor: ThemeColors.ACCENT_LIGHT,
                        selected: marcacoes[data]?.selected || false, 
                    };
                }
            });
            
            marcacoes[dataSelecionada] = {
                ...(marcacoes[dataSelecionada] || {}),
                selected: true,
                selectedColor: ThemeColors.ACCENT_PURPLE,
                selectedTextColor: ThemeColors.TEXT_LIGHT,
            };

            setMarkedDates(marcacoes);
            
            filtrarEventosPorData(dataSelecionada, dadosLocais);

        } catch (error) {
            console.error("Erro ao carregar eventos:", error);
        } finally {
            setCarregando(false);
        }
    }, [dataSelecionada]);

    const filtrarEventosPorData = (data, lista) => {
        const eventos = lista.filter(local => local.data === data);
        setEventosDoDia(eventos);
    };

    useEffect(() => {
        buscarLocais();
    }, [buscarLocais]);
    
    const onDayPress = (day) => {
        const novaDataSelecionada = day.dateString;
        
        const novasMarcacoes = {};
        Object.keys(markedDates).forEach(key => {
            novasMarcacoes[key] = { ...markedDates[key], selected: false };
        });

        novasMarcacoes[novaDataSelecionada] = {
            ...(novasMarcacoes[novaDataSelecionada] || {}),
            selected: true,
            selectedColor: ThemeColors.ACCENT_PURPLE,
            selectedTextColor: ThemeColors.TEXT_LIGHT,
        };

        setMarkedDates(novasMarcacoes);
        setDataSelecionada(novaDataSelecionada);
        filtrarEventosPorData(novaDataSelecionada, locais);
    };
    
    const renderEventItem = ({ item }) => (
        <TouchableOpacity 
            style={ComponentStyles.listagemItemCard}
            onPress={() => navigation.navigate('Detalhes', { localId: item.id })}
        >
            <Text style={ComponentStyles.listagemItemTitle}>{item.nome}</Text>
            <Text style={ComponentStyles.listagemItemDetail}>Tipo: {item.tipo} - {item.endereco}</Text>
        </TouchableOpacity>
    );


    if (carregando) {
        return (
            <View style={[GlobalStyles.container, { justifyContent: 'center' }]}>
                <ActivityIndicator size="large" color={ThemeColors.ACCENT_PURPLE} />
                <Text style={ComponentStyles.listagemEmptyText}>Carregando agenda...</Text>
            </View>
        );
    }

    return (
        <View style={GlobalStyles.container}>
            <Text style={ScreenStyles.listTitle}>Sua Agenda de Eventos</Text>
            
            <Calendar
                onDayPress={onDayPress}
                markedDates={markedDates}
                markingType={'dot'} 
                theme={{
                    calendarBackground: ThemeColors.BG_DARK,
                    dayTextColor: ThemeColors.TEXT_LIGHT,
                    monthTextColor: ThemeColors.ACCENT_PURPLE,
                    textSectionTitleColor: ThemeColors.ACCENT_LIGHT,
                    selectedDayBackgroundColor: ThemeColors.ACCENT_PURPLE,
                    selectedDayTextColor: ThemeColors.TEXT_LIGHT,
                    todayTextColor: ThemeColors.ERROR, 
                    dotColor: ThemeColors.ACCENT_LIGHT,
                    textDisabledColor: ThemeColors.BG_SURFACE,
                }}
            />
            
            <Text style={[ScreenStyles.listSubtitle, { marginTop: 15, marginBottom: 10 }]}>
                Eventos em {new Date(dataSelecionada + 'T00:00:00').toLocaleDateString('pt-BR')}
            </Text>

            <FlatList
                data={eventosDoDia}
                renderItem={renderEventItem}
                keyExtractor={item => item.id.toString()}
                ListEmptyComponent={() => (
                    <Text style={[ComponentStyles.listagemEmptyText, { color: ThemeColors.ACCENT_LIGHT }]}>
                        Nenhum evento agendado para este dia. 🎉
                    </Text>
                )}
                style={{ flex: 1, paddingHorizontal: 10 }}
            />
        </View>
    );
};

export default Home;