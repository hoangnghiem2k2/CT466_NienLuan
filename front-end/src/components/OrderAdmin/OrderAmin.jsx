import { Button, Form, Space } from 'antd'
import React from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'
import TableComponent from '../TableComponent/TableComponent'
import InputComponent from '../InputComponent/InputComponent'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import Loading from '../LoadingComponent/Loading'
import ModalComponent from '../ModalComponent/ModalComponent'
import { convertPrice, getBase64 } from '../../utils'
import { useEffect } from 'react'
import * as message from '../Message/Message'
import { UpdateOrder } from '../../services/OrderService';
import * as OrderService from '../../services/OrderService'
import { useQuery } from '@tanstack/react-query'
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { orderContant } from '../../contant'
import PieChartComponent from './PieChart'

const OrderAdmin = () => {
  const user = useSelector((state) => state?.user)


  const getAllOrder = async () => {
    const res = await OrderService.getAllOrder(user?.access_token)
    return res
  }


  const queryOrder = useQuery({ queryKey: ['orders'], queryFn: getAllOrder })
  const { isLoading: isLoadingOrders, data: orders } = queryOrder

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponent
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
      }
    },
  
  });

  const columns = [
    {
      title: 'User name',
      dataIndex: 'userName',
      sorter: (a, b) => a.userName.length - b.userName.length,
      ...getColumnSearchProps('userName')
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      sorter: (a, b) => a.phone.length - b.phone.length,
      ...getColumnSearchProps('phone')
    },
    {
      title: 'Address',
      dataIndex: 'address',
      sorter: (a, b) => a.address.length - b.address.length,
      ...getColumnSearchProps('address')
    },
    {
      title: 'Paided',
      dataIndex: 'isPaid',
      sorter: (a, b) => a.isPaid.length - b.isPaid.length,
      ...getColumnSearchProps('isPaid')
    },
    {
      title: 'Shipped',
      dataIndex: 'isDelivered',
      sorter: (a, b) => a.isDelivered.length - b.isDelivered.length,
      ...getColumnSearchProps('isDelivered')
    },
    {
      title: 'Payment method',
      dataIndex: 'paymentMethod',
      sorter: (a, b) => a.paymentMethod.length - b.paymentMethod.length,
      ...getColumnSearchProps('paymentMethod')
    },
    {
      title: 'Total price',
      dataIndex: 'totalPrice',
      sorter: (a, b) => a.totalPrice.length - b.totalPrice.length,
      ...getColumnSearchProps('totalPrice')
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <Button type="primary" onClick={() => handleUpdateOrder(record)}>Hoàn thành</Button>
      )
    }
  ];

  const dataTable = orders?.data?.length && orders?.data?.map((order) => {
    console.log('usewr', order)
    return { ...order, key: order._id, userName: order?.shippingAddress?.fullName, phone: order?.shippingAddress?.phone, address: order?.shippingAddress?.address, paymentMethod: orderContant.payment[order?.paymentMethod],isPaid: order?.isPaid ? 'TRUE' :'FALSE',isDelivered: order?.isDelivered ? 'TRUE' : 'FALSE', totalPrice: convertPrice(order?.totalPrice)}
  })

  const calculateTotalPrice = () => {
    if (!orders?.data?.length) return 0;
    const totalPrice = orders.data.reduce((acc, order) => acc + order.totalPrice, 0);
    return convertPrice(totalPrice);
  }

  const totalFormattedPrice = calculateTotalPrice();


// Inside the OrderAdmin component
const handleUpdateOrder = async (record) => {
  try {
    // Extract the order ID from the record
    const orderId = record._id;
    console.log(record._id)
    
    // Extract the user ID from the user object obtained via useSelector
    
    // Call the UpdateOrder service function passing the order ID, access token, and user ID
    const updatedOrder = await UpdateOrder(orderId, user?.access_token);
    
    // Log the updated order
    console.log('Updated order:', updatedOrder);
    
    // You can also handle UI updates or any other logic here
  } catch (error) {
    // Handle errors
    console.error('Error updating order:', error);
  }
};


  return (
    <div>
      <WrapperHeader>Quản lý đơn hàng</WrapperHeader>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ height: 200, width: 200, marginRight: 20 }}>
          <div>Tỉ lệ các đơn hàng có giá trị trên 500.000đ</div>
          <PieChartComponent data={orders?.data} />
        </div>
        <div>Tổng doanh thu: {totalFormattedPrice}</div>
      </div>
      <div style={{ marginTop: '20px' }}>
        <TableComponent columns={columns} isLoading={isLoadingOrders} data={dataTable} />
      </div>
    </div>
  )
}

export default OrderAdmin
