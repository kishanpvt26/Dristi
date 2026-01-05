import React, { useState } from 'react';
import { LayoutDashboard, Users, Activity, Calendar, LogOut, TrendingUp, UserCheck, AlertTriangle } from 'lucide-react';
import { DristiLogo } from './DristiLogo';
import { HistoryService } from '../services/historyService';

export function DoctorDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');
  const history = HistoryService.getHistory();

  // Mock Analytics Data
  const totalScans = history.length + 1240; // Fake historic data
  const riskCases = history.filter(h => h.prediction !== 'Healthy').length + 342;
  const healthyCases = totalScans - riskCases;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <DristiLogo className="h-8 brightness-0 invert" />
          <p className="text-slate-500 text-xs mt-2">Specialist Portal v2.0</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'overview' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            <LayoutDashboard className="h-5 w-5" />
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('patients')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'patients' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            <Users className="h-5 w-5" />
            Patients
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 transition-colors">
            <Calendar className="h-5 w-5" />
            Appointments
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 transition-colors">
            <Activity className="h-5 w-5" />
            Analytics
          </button>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors px-4 py-2"
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white h-16 border-b border-gray-200 flex items-center justify-between px-8">
          <h1 className="text-xl font-bold text-gray-800 capitalize">{activeTab}</h1>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold text-gray-900">Dr. Rajesh Kumar</p>
              <p className="text-xs text-gray-500">Chief Retinologist</p>
            </div>
            <div className="h-10 w-10 bg-brand-100 rounded-full flex items-center justify-center text-brand-700 font-bold border border-brand-200">
              DR
            </div>
          </div>
        </header>

        <div className="p-8">
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fade-in">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Total Screenings</p>
                      <h3 className="text-3xl font-bold text-gray-900 mt-1">{totalScans.toLocaleString()}</h3>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="text-xs text-green-600 font-medium flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +12% from last month
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Risk Detected</p>
                      <h3 className="text-3xl font-bold text-red-600 mt-1">{riskCases.toLocaleString()}</h3>
                    </div>
                    <div className="bg-red-50 p-3 rounded-lg">
                      <AlertTriangle className="h-6 w-6 text-red-600" />
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 mt-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '28%' }}></div>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">28% detection rate</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Patients Cleared</p>
                      <h3 className="text-3xl font-bold text-green-600 mt-1">{healthyCases.toLocaleString()}</h3>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <UserCheck className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <div className="text-xs text-green-600 font-medium flex items-center gap-1">
                    <UserCheck className="h-3 w-3" />
                    High clearance rate
                  </div>
                </div>
              </div>

              {/* Recent Activity Table */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="font-bold text-gray-900">Recent Screenings</h3>
                  <button className="text-sm text-brand-600 hover:text-brand-700 font-medium">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-gray-50 text-xs uppercase font-semibold text-gray-500">
                      <tr>
                        <th className="px-6 py-3">Patient ID</th>
                        <th className="px-6 py-3">Date</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Confidence</th>
                        <th className="px-6 py-3">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {history.length > 0 ? history.slice(0, 5).map((scan) => (
                        <tr key={scan.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 font-mono font-medium text-gray-900">{scan.id}</td>
                          <td className="px-6 py-4">{new Date(scan.timestamp).toLocaleDateString()}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                              scan.prediction === 'Healthy' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {scan.prediction}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-gray-200 rounded-full h-1.5">
                                <div 
                                  className={`h-1.5 rounded-full ${scan.prediction === 'Healthy' ? 'bg-green-500' : 'bg-red-500'}`} 
                                  style={{ width: `${scan.confidence}%` }}
                                ></div>
                              </div>
                              <span className="text-xs">{scan.confidence}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <button className="text-brand-600 hover:text-brand-800 font-medium text-xs">View Report</button>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan="5" className="px-6 py-8 text-center text-gray-400">
                            No recent scans found in local history.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'patients' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
              <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900">Patient Directory</h3>
              <p className="text-gray-500 mt-2">Access to 1,500+ patient records is available in the full EMR integration.</p>
              <button className="mt-6 bg-brand-600 text-white px-6 py-2 rounded-lg hover:bg-brand-700 transition-colors">
                Connect EMR
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
