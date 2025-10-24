import { useEffect, useState } from 'react';
import { fetchData } from '../api/testApi';

export default function Home() {

  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const result = await fetchData();
      setData(result);
    };
    getData();
  }, []);

  return (
    <div>

      <p>This is a simple application demonstrating the use of FastAPI and Vite.</p>
      {data && (
        <div>
          <h2>Data from API:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}