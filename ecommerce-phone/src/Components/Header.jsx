import React from 'react';
import {Col, Row} from 'antd';
function Header() {
    return (
        <div>
            <Row>
                <Col span={6}>col-8</Col> 
                <Col span={12}>col-8</Col> 
                <Col span={8}>col-8</Col>
            </Row>
        </div>
    )
}
export default Header