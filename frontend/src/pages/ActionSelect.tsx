import { Button, Typography, Space, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const { Title, Text } = Typography;

export default function ActionSelect() {
  
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(useLocation().search);
    const fileName = queryParams.get("fileName");

  return (
    <div style={{ textAlign: "center", marginTop: 80 }}>
      <Title level={2}>What would you like to do?</Title>
      <Text type="secondary">Choose one of the actions below</Text>

      <div style={{ marginTop: 30 }}>
        <Space size="large">
          <Button
            type="primary"
            size="large"
            onClick={() => navigate(`/quiz-options?fileName=${fileName}`)}
          >
            Generate Quiz
          </Button>

          <Button
            size="large"
            onClick={() => message.info("Ask Question feature coming soon!")}
          >
            Ask Question
          </Button>
        </Space>
      </div>
    </div>
  );
}
