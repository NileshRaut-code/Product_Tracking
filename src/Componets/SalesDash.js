import React, { useEffect, useState } from 'react';
import { FaBox, FaDollarSign, FaChartLine, FaChartPie, FaChartBar, FaChartArea } from 'react-icons/fa';
import { Bar, Pie, Line, Doughnut, Radar } from 'react-chartjs-2';
import 'chart.js/auto';

const SalesDash = () => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    // Fetch the sales data from the provided JSON
    const data =[
        {
            "_id": "65e8113e36f0478534526fa3",
            "product_id": "65e81080883d1e6146e6dbee",
            "quantity": 40,
            "price": 799,
            "ordercreatedBy": "65bb48e64a7f1d0deb535371",
            "address": "dasd123",
            "pincode": 12313,
            "payment_mode": "COD",
            "status": "DELIVERED",
            "createdAt": "2024-03-06T06:46:22.373Z",
            "updatedAt": "2024-03-28T11:36:35.436Z",
            "total_cost": 3196,
            "productDetails": {
                "title": "boAt Airdopes Atom 81 TWS Earbuds with Upto 50H Playtime, Quad Mics ENx™ Tech, 13MM",
                "image": "http://res.cloudinary.com/dowwcdnts/image/upload/v1709707392/vm43zozwxwcg13dbrqwx.jpg",
                "createdBy": "65e80f39883d1e6146e6dbd2"
            }
        },
        {
            "_id": "66eba4251695beb5256955cd",
            "product_id": "65e81080883d1e6146e6dbee",
            "quantity": 170,
            "price": 799,
            "ordercreatedBy": "65b9c642dc61731e40b05bcb",
            "address": "lon",
            "pincode": 15300,
            "payment_mode": "CREDITCARD",
            "status": "DISPATCH",
            "createdAt": "2024-09-19T04:10:13.863Z",
            "updatedAt": "2024-12-23T05:03:36.778Z",
            "total_cost": 13583,
            "productDetails": {
                "title": "boAt Airdopes Atom 81 TWS Earbuds with Upto 50H Playtime, Quad Mics ENx™ Tech, 13MM",
                "image": "http://res.cloudinary.com/dowwcdnts/image/upload/v1709707392/vm43zozwxwcg13dbrqwx.jpg",
                "createdBy": "65e80f39883d1e6146e6dbd2"
            }
        },
        {
            "_id": "6736ea9394827ebe5a13ab53",
            "product_id": "6605579483e9053991b28cc1",
            "quantity": 2,
            "price": 1234,
            "ordercreatedBy": "65bb46a56bfc8080c0bc364d",
            "address": "hj",
            "pincode": 677,
            "payment_mode": "EMI",
            "status": "CANCLED",
            "createdAt": "2024-11-15T06:30:43.351Z",
            "updatedAt": "2024-12-21T11:26:42.250Z",
            "total_cost": 2468,
            "productDetails": {
                "title": "Kampes Ultrasonic Cool Mist Aroma Diffuser & Humidifier with Remote Control - Wooden Grain, 300ml Capacity",
                "image": "http://res.cloudinary.com/dowwcdnts/image/upload/v1734852704/gjmgelqs7g5hkp6dcruo.jpg",
                "createdBy": "65e80f39883d1e6146e6dbd2"
            }
        },
        {
            "_id": "6766a568851851479f4bb2fb",
            "product_id": "6605579483e9053991b28cc1",
            "quantity": 1,
            "price": 1234,
            "ordercreatedBy": "65bb48e64a7f1d0deb535371",
            "address": "asd",
            "pincode": 123123,
            "payment_mode": "COD",
            "status": "DELIVERED",
            "createdAt": "2024-12-21T11:24:24.347Z",
            "updatedAt": "2024-12-21T11:26:30.774Z",
            "total_cost": 1234,
            "productDetails": {
                "title": "Kampes Ultrasonic Cool Mist Aroma Diffuser & Humidifier with Remote Control - Wooden Grain, 300ml Capacity",
                "image": "http://res.cloudinary.com/dowwcdnts/image/upload/v1734852704/gjmgelqs7g5hkp6dcruo.jpg",
                "createdBy": "65e80f39883d1e6146e6dbd2"
            }
        }
    ]
    setSalesData(data);
  }, []);

  const getTotalSales = () => {
    return salesData.reduce((total, item) => total + item.total_cost, 0);
  };

  const getTotalQuantity = () => {
    return salesData.reduce((total, item) => total + item.quantity, 0);
  };

  const getOrderStatusCounts = () => {
    const statusCounts = { DELIVERED: 0, DISPATCH: 0, CANCLED: 0 };
    salesData.forEach(item => {
      if (statusCounts[item.status] !== undefined) {
        statusCounts[item.status]++;
      }
    });
    return statusCounts;
  };

  const trimLabel = (label) => {
    return label.length > 20 ? label.substring(0, 17) + '...' : label;
  };

  const chartData = {
    labels: salesData.map(item => trimLabel(item.productDetails.title)),
    datasets: [
      {
        label: 'Total Cost',
        data: salesData.map(item => item.total_cost),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Quantity',
        data: salesData.map(item => item.quantity),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  const pieData = {
    labels: salesData.map(item => trimLabel(item.productDetails.title)),
    datasets: [
      {
        data: salesData.map(item => item.total_cost),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
      },
    ],
  };

  const radarData = {
    labels: salesData.map(item => trimLabel(item.productDetails.title)),
    datasets: [
      {
        label: 'Total Cost',
        data: salesData.map(item => item.total_cost),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
      {
        label: 'Quantity',
        data: salesData.map(item => item.quantity),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  const statusCounts = getOrderStatusCounts();
  const statusData = {
    labels: ['Delivered', 'Dispatched', 'Canceled'],
    datasets: [
      {
        data: [statusCounts.DELIVERED, statusCounts.DISPATCH, statusCounts.CANCLED],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
      },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sales Dashboard</h1>
      <div className="bg-white shadow-md rounded p-4 mb-4">
          <h2 className="text-xl font-semibold mb-2 flex items-center">
            <FaDollarSign className="mr-2" /> Total Sales: ${getTotalSales()}
          </h2>
          <h2 className="text-xl font-semibold mb-2 flex items-center">
            <FaBox className="mr-2" /> Total Quantity: {getTotalQuantity()}
          </h2>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
       
        <div className="bg-white shadow-md rounded p-4">
          <h2 className="text-xl font-semibold mb-2 flex items-center">
            <FaChartLine className="mr-2" /> Sales Chart
          </h2>
          <div style={{ height: '300px' }}>
            <Bar data={chartData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
        <div className="bg-white shadow-md rounded p-4">
          <h2 className="text-xl font-semibold mb-2 flex items-center">
            <FaChartPie className="mr-2" /> Sales Distribution
          </h2>
          <Pie data={pieData} />
        </div>
        <div className="bg-white shadow-md rounded p-4">
          <h2 className="text-xl font-semibold mb-2 flex items-center">
            <FaChartLine className="mr-2" /> Sales Over Time
          </h2>
          <div style={{ height: '300px' }}>
            <Line data={chartData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
        <div className="bg-white shadow-md rounded p-4">
          <h2 className="text-xl font-semibold mb-2 flex items-center">
            <FaChartBar className="mr-2" /> Sales Doughnut
          </h2>
          <Doughnut data={pieData} />
        </div>
        <div className="bg-white shadow-md rounded p-4">
          <h2 className="text-xl font-semibold mb-2 flex items-center">
            <FaChartArea className="mr-2" /> Sales Radar
          </h2>
          <Radar data={radarData} />
        </div>
        <div className="bg-white shadow-md rounded p-4">
          <h2 className="text-xl font-semibold mb-2 flex items-center">
            <FaChartPie className="mr-2" /> Order Status
          </h2>
          <Pie data={statusData} />
        </div>
        <div className="bg-white shadow-md rounded p-4 col-span-1 md:col-span-3">
          <h2 className="text-xl font-semibold mb-2">Sales Report</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Product</th>
                <th className="py-2 px-4 border-b">Quantity</th>
                <th className="py-2 px-4 border-b">Total Cost</th>
                <th className="py-2 px-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((item) => (
                <tr key={item._id}>
                  <td className="py-2 px-4 border-b">{trimLabel(item.productDetails.title)}</td>
                  <td className="py-2 px-4 border-b">{item.quantity}</td>
                  <td className="py-2 px-4 border-b">${item.total_cost}</td>
                  <td className="py-2 px-4 border-b">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalesDash;