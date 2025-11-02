import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Card, Button, Radio, Typography, message } from "antd";

const { Title } = Typography;

export default function QuizAttempt() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const quiz = state?.quiz || [];

  const queryParams = new URLSearchParams(useLocation().search);
  const fileName = queryParams.get("fileName") || "";


  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  const handleSelect = (index: number, value: string) => {
    setAnswers({ ...answers, [index]: value });
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < quiz.length) {
      message.warning("Please answer all questions before submitting!");
      return;
    }

    // Calculate score
    let score = 0;
    quiz.forEach((q: any, i: number) => {
      if (answers[i] === q.correct_answer) score++;
    });

    // ✅ Navigate to results page
    navigate(`/quiz-results?fileName=${fileName}`, {
      state: { score, total: quiz.length },
    });
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <Title level={2}>Answer the Quiz</Title>

      {quiz.map((q: any, i: number) => (
        <Card key={i} style={{ marginBottom: 20, textAlign: "left" }} title={`Question ${i + 1}`}>
          <p>{q.question}</p>
          <Radio.Group
            onChange={(e) => handleSelect(i, e.target.value)}
            value={answers[i]}
          >
            {q.answers.map((ans: string, idx: number) => (
              <Radio key={idx} value={ans} style={{ display: "block", margin: "5px 0" }}>
                {ans}
              </Radio>
            ))}
          </Radio.Group>
        </Card>
      ))}

      <Button type="primary" onClick={handleSubmit}>
        Submit Quiz
      </Button>
    </div>
  );
}
