// Service to handle scan history in LocalStorage
const STORAGE_KEY = 'dristi_scan_history';

export const HistoryService = {
  // Save a new scan result
  saveScan: (result) => {
    try {
      const history = HistoryService.getHistory();
      // Add new result to start of array
      // Limit to last 50 scans to save space
      const newHistory = [result, ...history].slice(0, 50);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
      return newHistory;
    } catch (error) {
      console.error("Failed to save history:", error);
      return [];
    }
  },

  // Get all saved scans
  getHistory: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Failed to read history:", error);
      return [];
    }
  },

  // Clear history
  clearHistory: () => {
    localStorage.removeItem(STORAGE_KEY);
    return [];
  },

  // Delete specific scan
  deleteScan: (id) => {
    const history = HistoryService.getHistory();
    const newHistory = history.filter(scan => scan.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
    return newHistory;
  }
};
