import React from 'react';
import { Card } from 'antd';

const { Meta } = Card;

const Card: React.FC = () => (
  <Card
    hoverable
    style={{ width: 240 }}
    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
  >
    <Meta title={} description="www.instagram.com" />
  </Card>
);

export default Card;