import React, { useState, useEffect } from 'react';
import { Users, Car, Activity, AlertTriangle, TrendingUp, Loader2 } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import api from '../services/api';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler
);

const StatCard = ({ title, value, icon: Icon, trend, trendUp, color }) => (
    <div className="glass-card stat-card-hover">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>{title}</p>
                <h3 style={{ fontSize: '2rem', color: 'var(--text-primary)', lineHeight: 1 }}>{value}</h3>
            </div>
            <div style={{ 
                width: '48px', height: '48px', borderRadius: '12px', 
                background: `rgba(${color}, 0.1)`, border: `1px solid rgba(${color}, 0.2)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: `rgb(${color})`
            }}>
                <Icon size={24} />
            </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.25rem' }}>
            <span style={{ 
                display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', fontWeight: 600,
                color: trendUp ? 'var(--success)' : 'var(--text-muted)' 
            }}>
                {trend && <TrendingUp size={14} style={{ transform: trendUp ? 'none' : 'scaleY(-1)' }} />}
                {trend || 'Live'}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Updated just now</span>
        </div>
    </div>
);

const Dashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const res = await api.get('/api/dashboard');
                setData(res.data);
            } catch (error) {
                console.error('Error fetching dashboard', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboard();
    }, []);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', color: 'var(--accent)' }}>
                <Loader2 className="pulse-active" size={48} style={{ animation: 'spin 1s linear infinite' }} />
            </div>
        );
    }

    const lineChartData = {
        labels: data?.vehicleTrend?.labels || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Active Vehicles',
                data: data?.vehicleTrend?.data || [0,0,0,0,0,0,0],
                borderColor: '#00f0ff',
                backgroundColor: 'rgba(0, 240, 255, 0.1)',
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#00f0ff',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#00f0ff'
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: 'rgba(10, 10, 15, 0.9)',
                titleColor: '#fff',
                bodyColor: '#a0a0b0',
                borderColor: 'rgba(255,255,255,0.1)',
                borderWidth: 1,
                padding: 12,
                boxPadding: 6
            }
        },
        scales: {
            x: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#606070' } },
            y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#606070' } }
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.75rem', color: 'var(--text-primary)' }}>Dashboard Overview</h1>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Welcome back, here's what's happening today.</p>
                </div>
                <button className="btn btn-primary" onClick={() => alert("Reporting Module Coming Soon!")}>Generate Report</button>
            </div>

            <div className="grid-cards" style={{ marginBottom: '2rem' }}>
                <StatCard title="Total Drivers" value={data?.stats?.totalDrivers || 0} icon={Users} color="0, 240, 255" />
                <StatCard title="Total Vehicles" value={data?.stats?.totalVehicles || 0} icon={Car} color="0, 255, 157" />
                <StatCard title="Active Logs (Now)" value={data?.stats?.activeLogs || 0} icon={Activity} color="255, 184, 0" trendUp={true} />
                <StatCard title="Maintenance Alerts" value={data?.stats?.maintenanceAlerts || 0} icon={AlertTriangle} color="255, 51, 102" />
            </div>

            <div className="grid-cards" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))' }}>
                <div className="glass-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>Vehicle Activity Trend</h3>
                        <select className="glass-input" style={{ width: 'auto', padding: '0.4rem 1rem' }}>
                            <option value="7">Last 7 Days</option>
                            <option value="30">Last 30 Days</option>
                        </select>
                    </div>
                    <div style={{ height: '300px' }}>
                        <Line data={lineChartData} options={chartOptions} />
                    </div>
                </div>

                <div className="glass-card">
                    <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Recent Alerts</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {data?.recentAlerts?.length > 0 ? data.recentAlerts.map((alert, idx) => (
                            <div key={alert._id} style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: idx===0 ? 'var(--danger)' : 'var(--warning)' }}></div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 500 }}>Vehicle {alert.auto?.rcNumber || alert.auto?.autoNumber} due for {alert.serviceCategory || 'service'}</p>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{new Date(alert.maintenanceDate).toLocaleDateString()}</p>
                                </div>
                                <button className="btn btn-glass" style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem' }}>View</button>
                            </div>
                        )) : (
                            <p style={{color: 'var(--text-muted)'}}>No recent maintenance alerts.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
