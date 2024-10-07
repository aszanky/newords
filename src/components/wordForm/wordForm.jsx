import React, { Component } from 'react';
import { Form, Input, Button, message } from 'antd';
import './wordForm.css'


export default class WordForm extends Component {
  onFinish = async (values) => {
    const baseURL = "http://localhost:8090/words";

    try {
      // Replace with your API URL
      const response = await fetch(`${baseURL}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values), // Send the form values as JSON
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      message.success(`word ${result.word.word} added successfully!`);
    } catch (error) {
      console.error("Error adding word:", error);
      message.error('Failed to add word. Please try again.');
    }
  };

  render() {
    return (
      <Form
        name="wordForm"
        layout="vertical"
        onFinish={this.onFinish}
        className="small-form"
      >
        <Form.Item
          label="Word"
          name="word"
          rules={[{ required: true, message: 'Please input your new word!' }]} // Validation rule
        >
          <Input placeholder="Enter your Word" />
        </Form.Item>

        <Form.Item
          label="Indonesia"
          name="indonesian"
          rules={[
            { required: true, message: 'Please input indonesia translation!' }
            // { type: 'email', message: 'The input is not valid E-mail!' }, // Email validation
          ]}
        >
          <Input placeholder="Enter Indonesia translation" />
        </Form.Item>

        <Form.Item
          label="Notes"
          name="notes"
          rules={[{ required: true, message: 'Please input Notes!' }]} // Validation rule
        >
          <Input placeholder="Enter your Notes" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
};