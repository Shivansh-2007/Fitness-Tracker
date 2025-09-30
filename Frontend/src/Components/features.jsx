import { FaDumbbell, FaChartLine, FaBullseye, FaMobileAlt } from 'react-icons/fa';
import './features.css'; 

const Features = () => {
  const features = [
    {
      icon: <FaDumbbell />,
      title: "Workout Logging",
      description: "Track exercises, sets, reps, and weights with our intuitive interface."
    },
    {
      icon: <FaChartLine />,
      title: "Progress Analytics",
      description: "Visualize your growth with interactive charts and weekly reports."
    },
    {
      icon: <FaBullseye />,
      title: "Goal Tracking",
      description: "Set and smash personal records with smart reminders."
    },
    {
      icon: <FaMobileAlt />,
      title: "Mobile Friendly",
      description: "Access your fitness data anywhere, on any device."
    }
  ];

  return (
    <section className="features-section">
      <div className="features-container">
        <h2 className="features-title">Powerful Features</h2>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;