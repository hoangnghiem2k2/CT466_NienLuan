import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button } from 'antd';
import { UserOutlined, CalendarOutlined, TableOutlined, TeamOutlined } from '@ant-design/icons'; // Import Ant Design icons
import map from '../../assets/images/map.png';

const BookingPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      const res = await axios.post('http://localhost:3001/api/table/bookings', formData);
      console.log(res.data);
      alert('Đặt bàn thành công');
      form.resetFields(); // Reset form fields after successful booking
    } catch (error) {
      console.error(error);
      alert('Đặt bàn thất bại, thời gian hoặc vị trí bạn bạn chọn hiện không khả dụng vui lòng chọn bàn khác');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div>
      <img src={map} alt="Restaurant Map" style={{ height: '500px', width: '800px' }} />
      </div>
      <div>
        <h2>Đặt bàn</h2>
        <Form
          form={form}
          onFinish={handleSubmit}
          style={{ margin: '0 auto', maxWidth: '400px' }}
          initialValues={{ maxCustomer: 1 }} // Set default value for maxCustomer
        >
          <Form.Item name="numberTable" rules={[{ required: true, message: 'Please enter the table number!' }]}>
            <Input prefix={<TableOutlined />} placeholder="Vị trí bàn bạn muốn" />
          </Form.Item>
          <Form.Item name="maxCustomer" rules={[{ required: true, message: 'Please enter the maximum number of customers!' }]}>
            <Input prefix={<TeamOutlined />} type="number" placeholder="Số khách tối đa" />
          </Form.Item>
          <Form.Item name="bookingTime" rules={[{ required: true, message: 'Please select the booking time!' }]}>
            <Input prefix={<CalendarOutlined />} type="datetime-local" placeholder="Thời gian" />
          </Form.Item>
          <Form.Item name="name" rules={[{ required: true, message: 'Please enter your name!' }]}>
            <Input prefix={<UserOutlined />} placeholder="Tên người dùng" />
          </Form.Item>
          
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Đặt trước ngay
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default BookingPage;
