import { useState } from "react";
import { Button, Typography, Space, message, Spin, Card } from "antd";
import { generateQuiz } from "../api/quiz";
import { useLocation } from "react-router-dom";

const { Title, Text } = Typography;

export default function QuizOptions() {
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState<any>(null);

  const queryParams = new URLSearchParams(useLocation().search);
  const fileName = queryParams.get("fileName") || "";

  const handleGenerateQuiz = async (numQuestions: number) => {
    setLoading(true);
    message.info(`Generating ${numQuestions} questions...`);

    try {
      // assume backend knows which file is current
      const data = await generateQuiz(numQuestions, fileName);

      message.success("Quiz generated successfully!");
      setQuiz(data);
    } catch (error: any) {
      console.error(error);
      message.error("Failed to generate quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: 80 }}>
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

        {quiz && (
          <div style={{ marginTop: 30, textAlign: "left", width: "60%", margin: "auto" }}>
            <Title level={3}>Generated Quiz</Title>
            {quiz.map((q: any, index: number) => (
              <Card
                key={index}
                style={{ marginBottom: 15, borderRadius: 12 }}
                title={`Question ${index + 1}`}
              >
                <p><strong>{q.question}</strong></p>
                <ul>
                  {q.answers.map((ans: string, i: number) => (
                    <li key={i}>{ans}</li>
                  ))}
                </ul>
                <p><b>Correct Answer:</b> {q.correct_answer}</p>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
