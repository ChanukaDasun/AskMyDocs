import { useState } from "react";
import { Button, Typography, Space, message, Spin } from "antd";
import { generateQuiz } from "../api/quiz";
import { useLocation, useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

export default function QuizOptions() {
  
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const queryParams = new URLSearchParams(useLocation().search);
  const fileName = queryParams.get("fileName") || "";

  const handleGenerateQuiz = async (numQuestions: number) => {
    setLoading(true);
    message.info(`Generating ${numQuestions} questions...`);

    try {
      const data = await generateQuiz(numQuestions, fileName);
      message.success("Quiz generated successfully!");

      navigate(`/quiz-attempt?fileName=${fileName}`, { state: { quiz: data } });
    } catch (error: any) {
      console.error(error);
      message.error("Failed to generate quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: 80 }}>
      <div style={{ position: "absolute", top: 10, left: 10 }}>
        <Button
          type="default"
          onClick={() => navigate(`/choose-action?fileName=${fileName}`)}
          style={{ borderRadius: 8 }}
        >
          ← Back to Actions
        </Button>
      </div>
      <Title level={2}>Generate Quiz</Title>
      <Text type="secondary">
        Choose how many questions you want to generate:
      </Text>

      <div style={{ marginTop: 30 }}>
        <Space size="large">
          <Button
            type="primary"
            onClick={() => handleGenerateQuiz(10)}
            disabled={loading}
          >
            10 Questions
          </Button>
          <Button
            type="primary"
            onClick={() => handleGenerateQuiz(15)}
            disabled={loading}
          >
            15 Questions
          </Button>
          <Button
            type="primary"
            onClick={() => handleGenerateQuiz(20)}
            disabled={loading}
          >
            20 Questions
          </Button>
        </Space>
      </div>

      <div style={{ marginTop: 40 }}>
        {loading && (
          <div>
            <Spin size="large" />
            <p>Generating your quiz, please wait...</p>
          </div>
        )}
      </div>
    </div>
  );
}
