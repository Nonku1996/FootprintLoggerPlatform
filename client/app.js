class EcoApp {
    constructor() {
        this.chart = null;
        this.init();
    }

    init() {
        this.updateDisplay('all');
        document.getElementById('log-form').addEventListener('submit', (e) => this.handleLog(e));
    }

    handleLog(e) {
        e.preventDefault();
        const activity = {
            category: document.getElementById('category').value,
            name: document.getElementById('name').value,
            co2: parseFloat(document.getElementById('value').value),
            date: new Date().toISOString()
        };
        
        StorageHelper.save(activity);
        this.updateDisplay('all');
        e.target.reset();
    }

    updateDisplay(filter) {
        const logs = StorageHelper.getFiltered(filter);
        const totals = StorageHelper.getTotals();
        
        document.getElementById('total-val').innerText = totals.all.toFixed(2);
        this.renderChart(totals);
        this.generateInsights(totals);
    }

    renderChart(totals) {
        const ctx = document.getElementById('mainChart').getContext('2d');
        if (this.chart) this.chart.destroy();

        this.chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Food', 'Transport', 'Energy'],
                datasets: [{
                    label: 'kg CO2',
                    data: [totals.food, totals.transport, totals.energy],
                    backgroundColor: ['#2d6a4f', '#2196f3', '#ff9f1c']
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    }

    generateInsights(totals) {
        const tipText = document.getElementById('tip-text');
        const progress = document.getElementById('progress-fill');
        
        const cats = [
            {n: 'Food', v: totals.food},
            {n: 'Transport', v: totals.transport},
            {n: 'Energy', v: totals.energy}
        ];
        const highest = cats.reduce((a, b) => a.v > b.v ? a : b);

        if (totals.all > 0) {
            tipText.innerHTML = `Your highest impact is <b>${highest.n}</b>. Consider reducing usage by 10%!`;
            const percent = Math.min((totals.all / 50) * 100, 100);
            progress.style.width = percent + '%';
        }
    }
}

const app = new EcoApp();