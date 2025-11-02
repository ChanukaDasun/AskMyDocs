import { useLocation, useNavigate } from "react-router-dom";
import { Typography, Button } from "antd";

const { Title, Text } = Typography;

export default function QuizResults() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(useLocation().search);
  const fileName = queryParams.get("fileName") || "";

  const score = state?.score ?? 0;
  const total = state?.total ?? 0;

  return (
    <div style={{ textAlign: "center", marginTop: 80 }}>
      <Title level={2}>Your Quiz Results</Title>
      <Text>You scored {score} out of {total}</Text>

      <div style={{ marginTop: 40 }}>
        <Button type="primary" onClick={() => navigate(`/choose-action?fileName=${fileName}`)}>
          Back to Actions
        </Button>
      </div>
    </div>
  );
}
