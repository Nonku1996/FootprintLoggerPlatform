function generateInsights(totals) {
    const insightPanel = document.getElementById('insight-engine');
    const tipText = document.getElementById('tip-text');
    
    // 1. Identify Highest Emission Category
    const categories = [
        { name: 'Food', val: totals.food },
        { name: 'Transport', val: totals.transport },
        { name: 'Energy', val: totals.energy }
    ];
    
    const highest = categories.reduce((prev, current) => (prev.val > current.val) ? prev : current);

    //Logic
    let tip = "";
    if (highest.val === 0) {
        tip = "Great start! Log your first activity to see how you can improve.";
    } else if (highest.name === 'Transport') {
        tip = "Your transport emissions are your biggest factor. Can you swap one car trip for a bike ride this week?";
    } else if (highest.name === 'Food') {
        tip = "Food is your main CO2 source. Consider 'Meatless Mondays' to drop your footprint by up to 15%.";
    } else {
        tip = "Energy use is high. Remember to unplug appliances not in use to save on 'Phantom Load'.";
    }

    tipText.innerHTML = `<strong>Top Impact: ${highest.name}</strong><br>${tip}`;
}