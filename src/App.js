// import logo from './logo.svg';
import React, { useState } from "react";
import { Table, Button, Typography, Layout, Flex, message } from 'antd'; 
// import { WordForm } from './components/wordForm.jsx';
import WordForm from './components/wordForm/wordForm'
import './App.css';

const { Text, Title } = Typography;
const { Header, Footer, Content } = Layout;

function App() {
  const baseURL = "http://localhost:8090/words";

  const [showTable, setShowTable] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [word, setWord] = useState('');
  const [indonesian, setIndonesian] = useState('');
  const [notes, setNotes] = useState('');

  const getListWords = async () => {
    setShowTable(!showTable);

    if (!showTable) {  // Only fetch when showing the table
      setLoading(true);

      try {
        const res = await fetch(`${baseURL}/get`);  // Example API
        const result = await res.json();

        const formattedData = result.response.map(item => ({
          id: item.id,
          word: item.word,
          indonesian: item.indonesian,
          notes: item.notes,
        }));

        setData(formattedData);
      } catch (err) {
        setData(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const addYourWords = async () => {
    setShowForm(!showForm);

    const myWords = { word, indonesian, notes };

    try {
      const response = await fetch(`$baseURL/add`, {  // Replace with your API URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(myWords),  // Convert JavaScript object to JSON string
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      message.success(`word ${result.word} added successfully!`);
    } catch (error) {
      console.error("Error posting data:", error);
      message.error('Failed to add word. Please try again.');
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Word',
      dataIndex: 'word',
      key: 'word',
    },
    {
      title: 'Indonesia',
      dataIndex: 'indonesian',
      key: 'indonesian',
    },
    {
      title: 'Notes',
      dataIndex: 'notes',
      key: 'notes',
    },
  ]

  return (
    <div className="App">
      <Flex gap="middle" wrap>
        <Layout>
          <Header className="app-header">Newords</Header>
          <Text style={{textAlign: 'center', marginTop:'40px', fontWeight: 'bold', fontSize: '20px'}}>
            Remember your new words here!
          </Text>
          <Content className="content-style">
            <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: '30px'}}>
              Add Your Words
            </Text>

            <WordForm />

            <Button type="primary" onClick={getListWords}>
              {showTable ? 'Hide Words' : 'Your Words Collection'}
            </Button>

            {/* {loading && <Spin size="large" />} */}

            {showTable && !loading && (
              <Table columns={columns} dataSource={data} pagination={false} style={{marginBottom: '30px'}} />
            )}
          </Content>
          <Footer className="footer-style">by Newords!</Footer>
        </Layout>
      </Flex>
    </div>
  );
}

export default App;
