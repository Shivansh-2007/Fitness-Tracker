import React, { useState } from 'react';
import { Form, Input, InputNumber, Select, Button, Row, Col, Card, DatePicker, message } from 'antd';
import DashboardNavbar from '../Components/DashboardNavbar';
import axios from 'axios';

const { Option } = Select;

const LogWorkout = () => {
  const [data, setData] = useState("");
  const [exercises, setExercises] = useState([{ id: 1 }]);
  
  const exerciseOptions = [
    'Bench Press',
    'Squat',
    'Deadlift',
    'Overhead Press',
    'Pull-Up',
    'Barbell Row'
  ];

  const onFinish = async (values) => {
    try {
      // Validate at least one exercise exists
      if (!values.exercises || Object.keys(values.exercises).length === 0) {
        message.error('Please add at least one exercise');
        return;
      }

      // Transform exercises data
      const formattedExercises = exercises.map(ex => {
        const exerciseData = values.exercises[ex.id];
        if (!exerciseData) {
          console.error(`Missing data for exercise ${ex.id}`);
          return null;
        }
        
        return {
          name: exerciseData.name,
          sets: exerciseData.sets,
          reps: exerciseData.reps,
          weight: `${exerciseData.weightValue || 0} ${exerciseData.weightUnit || 'kg'}`
        };
      }).filter(ex => ex !== null); // Remove any null entries

      const response = await axios.post(
        "http://localhost:5001/api/Workouts/logWorkouts",
        {
          name: values.workoutName,
          date: values.date.format('YYYY-MM-DD'),
          exercises: formattedExercises
        }
      );
      
      setData(response.data.message);
      message.success('Workout saved successfully!');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to save workout';
      setData(errorMessage);
      message.error(errorMessage);
      console.error("Save error:", error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Validation failed:', errorInfo);
    message.error('Please fill out all required fields correctly');
  };

  const addExercise = () => {
    setExercises([...exercises, { id: Date.now() }]); 
  };

  const removeExercise = (id) => {
    setExercises(exercises.filter(ex => ex.id !== id));
  };

  return (
    <div>
      <DashboardNavbar />
      
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Workout Date"
              name="date"
              rules={[{ required: true, message: 'Please select date' }]}
            >
              <DatePicker 
                style={{ width: '100%' }} 
                format="MMMM D, YYYY"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Workout Name"
              name="workoutName"
              rules={[{ required: true, message: 'Please enter workout name' }]}
            >
              <Input placeholder="e.g., Chest Day, Leg Day" />
            </Form.Item>
          </Col>
        </Row>

        <Card title="Exercises" style={{ marginBottom: 20 }}>
          {exercises.map((ex) => (
            <div key={ex.id} style={{ 
              marginBottom: 16, 
              borderBottom: '1px solid #f0f0f0', 
              paddingBottom: 16 
            }}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name={['exercises', ex.id, 'name']}
                    label="Exercise"
                    rules={[{ required: true, message: 'Select exercise' }]}
                  >
                    <Select showSearch placeholder="Select exercise">
                      {exerciseOptions.map(opt => (
                        <Option key={opt} value={opt}>{opt}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                
                <Col span={4}>
                  <Form.Item
                    name={['exercises', ex.id, 'sets']}
                    label="Sets"
                    rules={[{ required: true, message: 'Enter sets' }]}
                  >
                    <InputNumber min={1} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                
                <Col span={4}>
                  <Form.Item
                    name={['exercises', ex.id, 'reps']}
                    label="Reps"
                    rules={[{ required: true, message: 'Enter reps' }]}
                  >
                    <InputNumber min={1} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                
                <Col span={4}>
                  <Form.Item
                    name={['exercises', ex.id, 'weightValue']}
                    label="Weight"
                    rules={[{ required: true, message: 'Enter weight' }]}
                  >
                    <InputNumber min={0} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                
                <Col span={4}>
                  <Form.Item
                    name={['exercises', ex.id, 'weightUnit']}
                    label="Unit"
                    initialValue="kg"
                  >
                    <Select style={{ width: '100%' }}>
                      <Option value="kg">kg</Option>
                      <Option value="lbs">lbs</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              
              {exercises.length > 1 && (
                <Button 
                  type="link" 
                  danger 
                  onClick={() => removeExercise(ex.id)}
                  style={{ float: 'right' }}
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
          
          <Button type="dashed" onClick={addExercise} block>
            + Add Exercise
          </Button>
        </Card>

        <Form.Item>
          <Button type="primary" htmlType="submit" block size="large">
            Save Workout
          </Button>
        </Form.Item>
      </Form>
      
      {data && (
        <p style={{
          textAlign: 'center', 
          color: data.includes('success') ? 'green' : 'red',
          marginTop: 20
        }}>
          {data}
        </p>
      )}
    </div>
  );
};

export default LogWorkout;