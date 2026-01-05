import React from 'react';
import { Activity } from 'lucide-react';

export function ScanHistory({ history, onLoad, lang }) {
  if (!history || history.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 mt-12 mb-12 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Activity className="h-5 w-5 text-brand-600" />
          Recent Scans
        </h2>
        <button
          onClick={() => {
            const blob = new Blob([JSON.stringify(history, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `dristi-history.json`;
            a.click();
            URL.revokeObjectURL(url);
          }}
          className="text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 text-sm px-3 py-1.5 rounded-lg"
          aria-label="Export history as JSON"
        >
          Export
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {history.map((scan) => (
          <div 
            key={scan.id} 
            onClick={() => onLoad(scan)}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-mono text-gray-400">
                {new Date(scan.timestamp).toLocaleDateString()}
              </span>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                scan.prediction === 'Healthy' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {scan.prediction === 'Healthy' ? 'Healthy' : 'Detected'}
              </span>
            </div>
            <div className="flex gap-3">
              <img 
                src={scan.image} 
                alt="Thumbnail" 
                className="w-16 h-16 rounded-lg object-cover bg-gray-100" 
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-800 group-hover:text-brand-600 truncate">
                  {scan.id}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Confidence: {scan.confidence}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
