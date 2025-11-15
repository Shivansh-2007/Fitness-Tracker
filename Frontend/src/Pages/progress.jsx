import React, { useState, useEffect } from 'react';
import DashboardNavbar from '../Components/DashboardNavbar';
import { 
  Card, 
  Button, 
  Select, 
  DatePicker, 
  Row, 
  Col, 
  Statistic,
  Alert,
  message,
  Skeleton
} from 'antd';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid,
  Legend 
} from 'recharts';
import './progress.css';
import axios from 'axios';

const { RangePicker } = DatePicker;

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <h4 className="tooltip-date">{label}</h4>
        <p className="tooltip-value">
          <span className="tooltip-label">Weight: </span>
          <span className="tooltip-data">{payload[0].value} kg</span>
        </p>
        <p className="tooltip-value">
          <span className="tooltip-label">Reps: </span>
          <span className="tooltip-data">{payload[1].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

const ProgressPage = () => {
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [dateRange, setDateRange] = useState([]);
  const [timeframe, setTimeframe] = useState('week');
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 1. FIRST API CALL - Fetch exercises from /logWorkouts
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/Workouts/logWorkouts");
        
        // Extract and format exercises from response
        const allExercises = response.data.workouts.flatMap(workout => 
          workout.exercises.map(ex => ex.name)
        );
        
        const uniqueExercises = [...new Set(allExercises)] // Remove duplicates
          .map((exName, index) => ({ 
            _id: `${index}-${exName.toLowerCase().replace(/\s+/g, '-')}`,
            name: exName 
          }));
        
        setExercises(uniqueExercises);
      } catch (err) {
        setError('Failed to load exercises');
        console.error("Error fetching exercises:", err);
      }
    };
    fetchExercises();
  }, []);

  // Calculate progress metrics
  const calculateProgress = (data) => {
    if (data.length < 2) return 0;
    const first = data[0].weight;
    const last = data[data.length - 1].weight;
    return (((last - first) / first) * 100).toFixed(1);
  };

const fetchProgressData = async () => {
  if (!selectedExercise) {
    message.warning('Please select an exercise');
    return;
  }

  setLoading(true);
  try {
    const response = await axios.get("http://localhost:5001/api/Progress/progress", {
      params: {
        exercise: exercises.find(ex => ex._id === selectedExercise)?.name,
        timeframe,
        startDate: dateRange[0]?.toISOString(),
        endDate: dateRange[1]?.toISOString()
      }
    });

    setChartData(response.data.progressData);
    // You can also use response.data.stats if needed
  } catch (err) {
    setError(err.response?.data?.message || 'Failed to load progress data');
    console.error("Error fetching progress:", err);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="dashboard-layout">
      
      <div className="progress-content">
        <Card title="Workout Progress" className="progress-card">
          {error && (
            <Alert
              message="Error"
              description={error}
              type="error"
              showIcon
              closable
              onClose={() => setError(null)}
              style={{ marginBottom: 20 }}
            />
          )}

          {/* Filters */}
          <Row gutter={[16, 16]} className="filters">
            <Col xs={24} md={8}>
              <Select
                placeholder="Select Exercise"
                style={{ width: '100%' }}
                options={exercises.map(ex => ({
                  value: ex._id,
                  label: ex.name
                }))}
                onChange={setSelectedExercise}
                loading={exercises.length === 0}
              />
            </Col>
            
            <Col xs={24} md={8}>
              <RangePicker 
                style={{ width: '100%' }}
                onChange={setDateRange}
              />
            </Col>
            
            <Col xs={24} md={8}>
              <Button.Group style={{ width: '100%' }}>
                <Button 
                  onClick={() => setTimeframe('week')}
                  type={timeframe === 'week' ? 'primary' : 'default'}
                >
                  Weekly
                </Button>
                <Button 
                  onClick={() => setTimeframe('month')}
                  type={timeframe === 'month' ? 'primary' : 'default'}
                >
                  Monthly
                </Button>
                <Button 
                  onClick={() => setTimeframe('year')}
                  type={timeframe === 'year' ? 'primary' : 'default'}
                >
                  Yearly
                </Button>
              </Button.Group>
            </Col>
            
            <Col xs={24}>
              <Button 
                type="primary" 
                onClick={fetchProgressData}
                loading={loading}
                block
              >
                Load Progress Data
              </Button>
            </Col>
          </Row>

          {/* Stats Cards */}
          {chartData.length > 0 && (
            <Row gutter={16} style={{ margin: '20px 0' }}>
              <Col xs={24} sm={8}>
                <Card>
                  <Statistic
                    title="Current Max"
                    value={Math.max(...chartData.map(d => d.weight))}
                    suffix="kg"
                  />
                </Card>
              </Col>
              <Col xs={24} sm={8}>
                <Card>
                  <Statistic
                    title="Progress"
                    value={calculateProgress(chartData)}
                    suffix="%"
                    valueStyle={{
                      color: calculateProgress(chartData) >= 0 ? '#3f8600' : '#cf1322'
                    }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={8}>
                <Card>
                  <Statistic
                    title="Total Workouts"
                    value={chartData.length}
                  />
                </Card>
              </Col>
            </Row>
          )}

          {/* Chart Area */}
          <div className="chart-container">
            {loading ? (
              <Skeleton active paragraph={{ rows: 6 }} />
            ) : chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="date"
                    label={{
                      value: timeframe === 'week' ? 'Weeks' : 
                             timeframe === 'month' ? 'Months' : 'Years',
                      position: 'insideBottomRight',
                      offset: -5
                    }}
                  />
                  <YAxis 
                    yAxisId="left"
                    label={{
                      value: 'Weight (kg)',
                      angle: -90,
                      position: 'insideLeft'
                    }}
                  />
                  <YAxis 
                    yAxisId="right"
                    orientation="right"
                    label={{
                      value: 'Reps',
                      angle: -90,
                      position: 'insideRight'
                    }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="weight"
                    stroke="#8884d8"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                    name="Weight (kg)"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="reps"
                    stroke="#82ca9d"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                    name="Reps"
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="no-data">
                <img 
                  src="/images/no-data.svg" 
                  alt="No data" 
                  style={{ width: 150, opacity: 0.6 }}
                />
                <p>Select filters and click "Load Data"</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProgressPage;