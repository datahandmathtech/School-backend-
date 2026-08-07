import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { TrendingUp, Car, Users, Settings, Download } from 'lucide-react';
import StatCard from '../components/StatCard';

const Reports = () => {
    const [driverReports, setDriverReports] = useState([]);
    const [autoReports, setAutoReports] = useState([]);
    const [summary, setSummary] = useState({
        totalRevenue: 0,
        totalMaintenance: 0,
        totalTrips: 0
    });

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const [driverRes, autoRes, statsRes] = await Promise.all([
                    api.get('/api/reports/driver-earnings'),
                    api.get('/api/reports/auto-expenses'),
                    api.get('/api/reports/stats')
                ]);
                setDriverReports(driverRes.data);
                setAutoReports(autoRes.data);
                setSummary({
                    totalRevenue: statsRes.data.monthlyEarnings,
                    totalMaintenance: statsRes.data.monthlyMaintenanceCost,
                    totalTrips: statsRes.data.totalDailyTrips
                });
            } catch (err) {
                console.error(err);
            }
        };
        fetchReports();
    }, []);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: 800 }}>Reports & Analytics</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Analyze business performance and costs</p>
                </div>
                <button className="btn btn-primary" onClick={() => window.print()}>
                    <Download size={20} /> Export PDF
                </button>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem',
                marginBottom: '3.5rem'
            }}>
                <div style={{ background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', borderRadius: '24px', padding: '2rem', color: 'white', boxShadow: '0 10px 20px rgba(99, 102, 241, 0.2)' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <div style={{ background: 'rgba(255,255,255,0.2)', padding: '0.75rem', borderRadius: '12px' }}><TrendingUp size={24} /></div>
                        <p style={{ fontWeight: 700, opacity: 0.9 }}>Monthly Revenue</p>
                    </div>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 900 }}>₹{summary.totalRevenue}</h2>
                    <p style={{ fontSize: '0.875rem', marginTop: '0.5rem', opacity: 0.8 }}>Total collection for current month</p>
                </div>

                <div style={{ background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)', borderRadius: '24px', padding: '2rem', color: 'white', boxShadow: '0 10px 20px rgba(244, 63, 94, 0.2)' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <div style={{ background: 'rgba(255,255,255,0.2)', padding: '0.75rem', borderRadius: '12px' }}><Settings size={24} /></div>
                        <p style={{ fontWeight: 700, opacity: 0.9 }}>Maintenance Cost</p>
                    </div>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 900 }}>₹{summary.totalMaintenance}</h2>
                    <p style={{ fontSize: '0.875rem', marginTop: '0.5rem', opacity: 0.8 }}>Total repair expenses logged</p>
                </div>

                <div style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', borderRadius: '24px', padding: '2rem', color: 'white', boxShadow: '0 10px 20px rgba(16, 185, 129, 0.2)' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <div style={{ background: 'rgba(255,255,255,0.2)', padding: '0.75rem', borderRadius: '12px' }}><TrendingUp size={24} /></div>
                        <p style={{ fontWeight: 700, opacity: 0.9 }}>Net Profit</p>
                    </div>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 900 }}>₹{summary.totalRevenue - summary.totalMaintenance}</h2>
                    <p style={{ fontSize: '0.875rem', marginTop: '0.5rem', opacity: 0.8 }}>Earnings after maintenance</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '2.5rem' }}>
                <div className="card" style={{ border: 'none', boxShadow: '0 15px 35px rgba(0,0,0,0.05)', borderRadius: '24px' }}>
                    <h3 style={{ marginBottom: '2rem', fontWeight: 800, color: '#1e293b', fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Users size={24} color="var(--primary)" /> Driver Performance
                    </h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', borderBottom: '2px solid #f1f5f9' }}>
                                <th style={{ padding: '1rem', color: '#64748b', fontSize: '0.8rem', textTransform: 'uppercase' }}>Driver</th>
                                <th style={{ padding: '1rem', color: '#64748b', fontSize: '0.8rem', textTransform: 'uppercase' }}>Trips</th>
                                <th style={{ padding: '1rem', color: '#64748b', fontSize: '0.8rem', textTransform: 'uppercase' }}>KM</th>
                                <th style={{ padding: '1rem', color: '#64748b', fontSize: '0.8rem', textTransform: 'uppercase' }}>Earnings</th>
                            </tr>
                        </thead>
                        <tbody>
                            {driverReports.map((report) => (
                                <tr key={report._id} style={{ borderBottom: '1px solid #f8fafc' }}>
                                    <td style={{ padding: '1.25rem 1rem', fontWeight: 700, color: '#1e293b' }}>{report.driverDetails.name}</td>
                                    <td style={{ padding: '1.25rem 1rem' }}><span style={{ padding: '0.3rem 0.6rem', background: '#eff6ff', color: '#3b82f6', borderRadius: '6px', fontWeight: 700 }}>{report.tripCount}</span></td>
                                    <td style={{ padding: '1.25rem 1rem', fontWeight: 600 }}>{report.totalKM}</td>
                                    <td style={{ padding: '1.25rem 1rem', fontWeight: 800, color: '#059669' }}>₹{report.totalEarnings}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="card" style={{ border: 'none', boxShadow: '0 15px 35px rgba(0,0,0,0.05)', borderRadius: '24px' }}>
                    <h3 style={{ marginBottom: '2rem', fontWeight: 800, color: '#1e293b', fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Car size={24} color="var(--primary)" /> Auto Efficiency
                    </h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', borderBottom: '2px solid #f1f5f9' }}>
                                <th style={{ padding: '1rem', color: '#64748b', fontSize: '0.8rem', textTransform: 'uppercase' }}>Auto</th>
                                <th style={{ padding: '1rem', color: '#64748b', fontSize: '0.8rem', textTransform: 'uppercase' }}>Services</th>
                                <th style={{ padding: '1rem', color: '#64748b', fontSize: '0.8rem', textTransform: 'uppercase' }}>Repair Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {autoReports.map((report) => (
                                <tr key={report._id} style={{ borderBottom: '1px solid #f8fafc' }}>
                                    <td style={{ padding: '1.25rem 1rem' }}>
                                        <div style={{ fontWeight: 700, color: '#1e293b' }}>{report.autoDetails.autoNumber}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{report.autoDetails.model}</div>
                                    </td>
                                    <td style={{ padding: '1.25rem 1rem' }}>{report.serviceCount}</td>
                                    <td style={{ padding: '1.25rem 1rem', fontWeight: 800, color: '#ef4444' }}>₹{report.totalMaintenanceCost}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Reports;
