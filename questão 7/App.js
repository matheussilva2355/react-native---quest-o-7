import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View, 
  ScrollView, 
  Alert,
  Platform 
} from 'react-native';

export default function App() {
  const [nomeProduto, setNomeProduto] = useState('');
  const [precoOriginal, setPrecoOriginal] = useState('');
  const [percentualDesconto, setPercentualDesconto] = useState('');
  
  const [resultado, setResultado] = useState(null);

  const aplicarDesconto = () => {
    if (!nomeProduto || !precoOriginal || !percentualDesconto) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const preco = parseFloat(precoOriginal.replace(',', '.'));
    const desconto = parseFloat(percentualDesconto.replace(',', '.'));

    // Validar preço não negativo e desconto entre 0% e 100%[cite: 12]
    if (isNaN(preco) || preco < 0) {
      Alert.alert('Preço inválido', 'O preço original não pode ser negativo.');
      return;
    }

    if (isNaN(desconto) || desconto < 0 || desconto > 100) {
      Alert.alert('Desconto inválido', 'O percentual de desconto deve estar entre 0% e 100%.');
      return;
    }

    // Cálculo da economia e preço final
    const valorEconomia = (preco * desconto) / 100;
    const precoFinal = preco - valorEconomia;

    setResultado({
      produto: nomeProduto,
      economia: valorEconomia.toFixed(2),
      final: precoFinal.toFixed(2)
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Comércio Eletrônico</Text>
      <Text style={styles.subtitulo}>Calculadora de Desconto Percentual</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Nome do Produto:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Tênis Esportivo"
          placeholderTextColor="#888"
          value={nomeProduto}
          onChangeText={setNomeProduto}
        />

        <Text style={styles.label}>Preço Original (R$):</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 200.00"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={precoOriginal}
          onChangeText={setPrecoOriginal}
        />

        <Text style={styles.label}>Percentual de Desconto (%):</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 15"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={percentualDesconto}
          onChangeText={setPercentualDesconto}
        />

        <TouchableOpacity style={styles.botao} onPress={aplicarDesconto}>
          <Text style={styles.textoBotao}>Aplicar desconto</Text>
        </TouchableOpacity>
      </View>

      {resultado && (
        <View style={styles.cardResultado}>
          <Text style={styles.resultadoTitulo}>Resumo da Compra</Text>
          <Text style={styles.resultadoTexto}>Produto: <Text style={styles.negrito}>{resultado.produto}</Text></Text>
          <Text style={styles.resultadoTexto}>Economia: <Text style={[styles.negrito, styles.verde]}>R$ {resultado.economia}</Text></Text>
          <Text style={styles.resultadoTexto}>Preço Final: <Text style={[styles.negrito, styles.azul]}>R$ {resultado.final}</Text></Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f4f6f8',
    padding: 20,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 5,
  },
  subtitulo: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginBottom: 25,
  },
  formGroup: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: Platform.OS === 'ios' ? 0.1 : 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#fafafa',
    marginBottom: 15,
    color: '#333',
  },
  botao: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardResultado: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e1e4e8',
  },
  resultadoTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  resultadoTexto: {
    fontSize: 16,
    color: '#444',
    marginBottom: 6,
  },
  negrito: {
    fontWeight: 'bold',
  },
  verde: {
    color: '#28a745',
  },
  azul: {
    color: '#007AFF',
  },
});