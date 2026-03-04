
import { Row, Col, Button } from "react-bootstrap";
export default function Help(){

return (
<div>
        <Row className="justify-content-md-center">
          <Col sm={12} md={6} lg={4}>
            <Button
              className="customization"
              variant="info"
              href="mailto:support@davinci-ergo-lab.com?subject=I want something special..."
            >
              <h4>Need anything? Shoot us an email! 📧</h4>
            </Button>
          </Col>
        </Row>
</div>
)
} 
