import { useState } from "react";
import { Input, Button, Typography, Spin, message, Card } from "antd";
import { getAnswers } from "../api/answers";
import { useLocation, useNavigate } from "react-router-dom";

const { Title } = Typography;
const { TextArea } = Input;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const AskQuestions = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const queryParams = new URLSearchParams(useLocation().search);
  const fileName = queryParams.get("fileName") || "";
  const navigate = useNavigate();

  const handleSend = async () => {
    if (!input.trim()) {
      message.warning("Please type a question!");
      return;
    }

    const newMessages: ChatMessage[] = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await getAnswers(input, fileName);
      const aiMessage: ChatMessage = {
        role: "assistant",
        content: response || "No response returned.",
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch answer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        marginTop: 40,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ position: "absolute", top: 10, left: 10 }}>
        <Button
          type="default"
          onClick={() => navigate(`/choose-action?fileName=${fileName}`)}
          style={{ borderRadius: 8 }}
        >
          ← Back to Actions
        </Button>
      </div>

      <Title level={2}>Ask Questions about Your Document</Title>

      <div
        style={{
          width: "70%",
          maxWidth: 800,
          height: "65vh",
          overflowY: "auto",
          border: "1px solid #e0e0e0",
          borderRadius: 12,
          padding: 20,
          background: "#fafafa",
          marginTop: 20,
        }}
      >
        {messages.length === 0 && (
          <p style={{ textAlign: "center", color: "#888" }}>
            Start the conversation by asking your first question...
          </p>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              marginBottom: 12,
            }}
          >
            <Card
              style={{
                maxWidth: "70%",
                borderRadius:
                  msg.role === "user" ? "20px 20px 0px 20px" : "20px 20px 20px 0px",
                background: msg.role === "user" ? "#1890ff" : "#e6f4ff",
                color: msg.role === "user" ? "#fff" : "#000",
              }}
              bodyStyle={{ padding: "10px 15px" }}
            >
              {msg.content}
            </Card>
          </div>
        ))}

        {loading && (
          <div style={{ textAlign: "center", marginTop: 10 }}>
            <Spin size="small" />
          </div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          width: "70%",
          maxWidth: 800,
          marginTop: 20,
          gap: 10,
        }}
      >
        <TextArea
          rows={1}
          placeholder="Type your question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onPressEnter={(e) => {
            e.preventDefault();
            handleSend();
          }}
          disabled={loading}
        />
        <Button
          type="primary"
          onClick={handleSend}
          loading={loading}
          style={{ borderRadius: 8 }}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default AskQuestions;