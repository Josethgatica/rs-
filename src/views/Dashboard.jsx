import { Container, Card } from "react-bootstrap";

const Dashboard = () => {
  return (
    <Container>
      <br />
      <Card style={{ height: 600 }}>
        <iframe
          title="estadisticas"
          width="100%"
          height="100%"
          src="https://app.powerbi.com/view?r=eyJrIjoiNzJhNmUxNDItNTJmNC00OTgxLTIhY2ItOWZkNmQ4N2YxMWMyIiwiZCI6ImU0Nzl0NmZlLWRhMjctNDU0OC04NDM2LTVmOGIxNThlYTEyNyIsImMiOjZ9"
          allowFullScreen="true"
        ></iframe>
      </Card>
    </Container>
  );
};

export default Dashboard;