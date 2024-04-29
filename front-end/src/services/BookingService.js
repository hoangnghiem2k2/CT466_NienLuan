import axios from "axios"

export const axiosJWT = axios.create()

export const getBookingsByUserId = async (id) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/table/bookings/${id}`
    //  {
    //     headers: {
    //         token: `Bearer ${access_token}`,
    //     }
    // }
    )
    return res.data
  }
  export const getall = async () => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/table/bookings`)
    return res.data
  }

  export const cancelBooking = async (id) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/table/bookings/${id}`
    //  {
    //     headers: {
    //         token: `Bearer ${access_token}`,
    //     }
    // }
)
    return res.data
  }