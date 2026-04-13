const StorageHelper = {
    save(activity) {
        const logs = this.getAll();
        logs.push(activity);
        localStorage.setItem('footprint_logs', JSON.stringify(logs));
    },

    getAll() {
        return JSON.parse(localStorage.getItem('footprint_logs') || '[]');
    },

    getTotals() {
        const logs = this.getAll();
        return logs.reduce((acc, curr) => {
            acc[curr.category] = (acc[curr.category] || 0) + curr.co2;
            acc.all += curr.co2;
            return acc;
        }, { food: 0, transport: 0, energy: 0, all: 0 });
    }
};