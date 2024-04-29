import React, { useEffect, useState } from 'react';
import Loading from '../../components/LoadingComponent/Loading';
import { useQuery, useMutation } from '@tanstack/react-query';
import * as bookingService from '../../services/BookingService';
import { useSelector } from 'react-redux';
import { WrapperItemOrder, WrapperListOrder, WrapperHeaderItem, WrapperFooterItem, WrapperContainer, WrapperStatus } from './style';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { useLocation, useNavigate } from 'react-router-dom';
import * as message from '../../components/Message/Message';

const AdminBookingPage = () => {
    const location = useLocation();
    const { state } = location;
    const navigate = useNavigate();

    // Fetch bookings data
    const fetchBookings = async () => {
        const res = await bookingService.getall();
        return res.data;
    };

    const user = useSelector((state) => state.user);

    const queryBookings = useQuery({ queryKey: ['bookings'], queryFn: fetchBookings });
    const { isLoading, data: bookings } = queryBookings;

    // Handle cancel booking mutation
    const cancelBookingMutation = useMutation((id) => bookingService.cancelBooking(id), {
        onSuccess: () => {
            queryBookings.refetch();
            message.success('Booking cancelled successfully.');
        },
        onError: () => {
            message.error('Failed to cancel booking.');
        },
    });

    const handleCancelBooking = (id) => {
        cancelBookingMutation.mutate(id);
    };

   

    return (
        <Loading isLoading={isLoading}>
            <WrapperContainer>
                <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
                <h1 style={{ textAlign: 'center' }}>Danh sách đặt bàn</h1>
                    <WrapperListOrder>
                        {bookings?.map((booking) => (
                            <WrapperItemOrder key={booking._id}>
                                <WrapperStatus>
                                    <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Giờ đặt</span>
                                    <div>
                                        <span style={{ color: 'rgb(255, 66, 78)' }}>Booking Time: </span>
                                        <span style={{ color: 'rgb(90, 32, 193)', fontWeight: 'bold' }}>
                                            {new Date(booking.bookingTime).toLocaleString()}
                                        </span>
                                    </div>
                                </WrapperStatus>
                                <WrapperStatus>
                                    <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Người đặt</span>
                                    <div>
                                        <span style={{ color: 'rgb(255, 66, 78)' }}>Tên: </span>
                                        <span style={{ color: 'rgb(90, 32, 193)', fontWeight: 'bold' }}>
                                            {booking.name}
                                        </span>
                                    </div>
                                </WrapperStatus>
                                <WrapperFooterItem>
                                    <div>
                                        <span style={{ color: 'rgb(255, 66, 78)' }}>Bàn số: </span>
                                        <span style={{ fontSize: '13px', color: 'rgb(56, 56, 61)', fontWeight: 700 }}>
                                            {booking.numberTable}
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <ButtonComponent
                                            onClick={() => handleCancelBooking(booking._id)}
                                            size={40}
                                            styleButton={{
                                                height: '36px',
                                                border: '1px solid #9255FD',
                                                borderRadius: '4px',
                                            }}
                                            textbutton={'Cancel Booking'}
                                            styleTextButton={{ color: '#9255FD', fontSize: '14px' }}
                                        ></ButtonComponent>
                                       
                                    </div>
                                </WrapperFooterItem>
                            </WrapperItemOrder>
                        ))}
                    </WrapperListOrder>
                </div>
            </WrapperContainer>
        </Loading>
    );
};

export default AdminBookingPage;
