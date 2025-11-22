import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, Alert, Platform, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker'; 
import { API_BASE_URL } from '../config.js'; 
import { GlobalStyles, ScreenStyles, ComponentStyles, ThemeColors } from '../styles/AppStyles'; 

const Cadastro = ({ navigation }) => {
    const [nome, setNome] = useState('');
    const [tipo, setTipo] = useState('');
    const [data, setData] = useState(new Date()); 
    const [endereco, setEndereco] = useState('');
    const [acompanhantes, setAcompanhantes] = useState('');
    const [descricao, setDescricao] = useState('');

    const [enviando, setEnviando] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const API_URL = `${API_BASE_URL}/servicos`;

    const onChangeDate = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setData(selectedDate);
        }
    };

    const handleSubmit = async () => {
        if (!nome || !tipo) {
            Alert.alert('Erro', 'Nome e Tipo são campos obrigatórios.');
            return;
        }

        setEnviando(true);

        const dataFormatada = 
            data.getFullYear() + '-' +
            String(data.getMonth() + 1).padStart(2, '0') + '-' + 
            String(data.getDate()).padStart(2, '0');

        const novoLocal = {
            nome,
            tipo,
            data: dataFormatada,
            endereco,
            acompanhantes,
            descricao,
        };

        try {
            await axios.post(API_URL, novoLocal);
            
            Alert.alert('Sucesso', 'Local cadastrado com sucesso!');
            
            setNome('');
            setTipo('');
            setData(new Date());
            setEndereco('');
            setAcompanhantes('');
            setDescricao('');

            navigation.navigate('Listagem'); 
        } catch (error) {
            console.error("Erro ao cadastrar local:", error);
            Alert.alert('Falha no Cadastro', `Erro: ${error.message}`);
        } finally {
            setEnviando(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={GlobalStyles.containerScroll}>
            <Text style={ScreenStyles.cadastroTitle}>Cadastrar Novo Local</Text>
            
            <Text style={ComponentStyles.cadastroLabel}>Nome:</Text>
            <TextInput 
                style={ComponentStyles.input}
                value={nome}
                onChangeText={setNome}
            />

            <Text style={ComponentStyles.cadastroLabel}>Tipo:</Text>
            <View style={ComponentStyles.pickerContainer}>
                <Picker
                    selectedValue={tipo}
                    onValueChange={(itemValue) => setTipo(itemValue)}
                >
                    <Picker.Item label="Selecione um Tipo" value="" />
                    <Picker.Item label="Bar" value="Bar" />
                    <Picker.Item label="Restaurante" value="Restaurante" />
                    <Picker.Item label="Parque" value="Parque" />
                    <Picker.Item label="Museu" value="Museu" />
                    <Picker.Item label="Outro" value="Outro" />
                </Picker>
            </View>

            
            <Text style={ComponentStyles.cadastroLabel}>Data do Evento:</Text>
            
            {Platform.OS === 'web' ? (
                
                <View style={ComponentStyles.datePickerRow}>
                    
                    <Text style={ComponentStyles.datePickerText}>
                        
                        {data.toLocaleDateString('pt-BR')}
                    </Text>

                    <Button 
                        title="Selecionar Data" 
                        onPress={() => {
                            
                            const dataAtualFormatada = data.getFullYear() + '-' +
                                String(data.getMonth() + 1).padStart(2, '0') + '-' + 
                                String(data.getDate()).padStart(2, '0');

                            const novaDataString = window.prompt(
                                "Digite a nova data (Formato: AAAA-MM-DD)",
                                dataAtualFormatada 
                            );
                            
                            if (novaDataString) {
                                
                                const partes = novaDataString.split('-');
                                
                                if (partes.length === 3) {
                                    const ano = parseInt(partes[0]);
                                    const mes = parseInt(partes[1]) - 1; 
                                    const dia = parseInt(partes[2]);

                                    const newDate = new Date(ano, mes, dia);

                                    if (!isNaN(newDate.getTime())) {
                                        setData(newDate);
                                        Alert.alert('Sucesso', `Data alterada para: ${newDate.toLocaleDateString('pt-BR')}`);
                                    } else {
                                        Alert.alert('Erro de Formato', 'Data inválida. Use o formato AAAA-MM-DD.');
                                    }
                                } else {
                                    Alert.alert('Erro de Formato', 'Data inválida. Use o formato AAAA-MM-DD.');
                                }
                            }
                        }}
                        color={ThemeColors.ACCENT_PURPLE}
                    />
                </View>

            ) : (
                
                <View style={ComponentStyles.datePickerRow}>
                    <Text style={ComponentStyles.datePickerText}>
                        {data.toLocaleDateString('pt-BR')}
                    </Text>
                    <Button 
                        title="Selecionar Data" 
                        onPress={() => setShowDatePicker(true)}
                        color={ThemeColors.ACCENT_PURPLE} 
                    />
                </View>
            )}

            
            {Platform.OS !== 'web' && showDatePicker && (
                <DateTimePicker
                    value={data}
                    mode="date"
                    display="default"
                    onChange={onChangeDate}
                />
            )}
            


            <Text style={ComponentStyles.cadastroLabel}>Endereço:</Text>
            <TextInput 
                style={ComponentStyles.input}
                value={endereco}
                onChangeText={setEndereco}
            />

            <Text style={ComponentStyles.cadastroLabel}>Acompanhantes Sugeridos:</Text>
            <TextInput 
                style={ComponentStyles.input}
                value={acompanhantes}
                onChangeText={setAcompanhantes}
            />

            <Text style={ComponentStyles.cadastroLabel}>Descrição:</Text>
            <TextInput 
                style={[ComponentStyles.input, ComponentStyles.inputMultiLine]}
                value={descricao}
                onChangeText={setDescricao}
                multiline={true}
                numberOfLines={4}
            />

            <View style={ComponentStyles.cadastroButtonContainer}>
                <Button 
                    title={enviando ? "Cadastrando..." : "Cadastrar Local"}
                    onPress={handleSubmit}
                    disabled={enviando}
                    color={ThemeColors.ACCENT_PURPLE}
                />
            </View>
        </ScrollView>
    );
};

export default Cadastro;