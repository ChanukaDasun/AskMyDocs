import { Typography } from "antd";
import FileUpload from '../components/FileUpload';

const { Title } = Typography;

export default function Home() {
  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <Title level={1}>AskMyDocs</Title>
      <p>Upload a document to generate quizzes or ask questions.</p>
      <FileUpload />
    </div>
  );
}
