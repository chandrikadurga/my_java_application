// In-memory storage
let icecreams = [];
let nextId = 1;

const CALORIE_CONFIG = {
  cone: {
    caloriesPerScoop: 120,
    extra: 50
  },
  cup: {
    caloriesPerScoop: 100,
    extra: 0
  },
  sundae: {
    caloriesPerScoop: 110,
    extra: 80
  }
};

class IceCreamModel {
  static calculateCalories(type, scoops) {
    const config = CALORIE_CONFIG[type.toLowerCase()];
    if (!config) {
      throw new Error('Invalid ice cream type');
    }
    
    const baseCalories = scoops * config.caloriesPerScoop;
    const totalCalories = baseCalories + config.extra;
    
    return totalCalories;
  }

  static addIceCream(name, type, scoops) {
    // Validation
    if (!name || name.trim() === '') {
      throw new Error('Ice cream name is required');
    }
    if (!type || !['cone', 'cup', 'sundae'].includes(type.toLowerCase())) {
      throw new Error('Invalid ice cream type');
    }
    if (!scoops || scoops <= 0 || !Number.isInteger(Number(scoops))) {
      throw new Error('Scoops must be a positive integer');
    }

    const calories = this.calculateCalories(type, Number(scoops));
    
    const newIceCream = {
      id: nextId++,
      name: name.trim(),
      type: type.toLowerCase(),
      scoops: Number(scoops),
      calories: calories,
      createdAt: new Date().toISOString()
    };

    // Simulate threading - async logging
    setTimeout(() => {
      console.log(`[THREAD] New Ice Cream Added: ${newIceCream.name} (${newIceCream.scoops} scoops, ${newIceCream.calories} kcal)`);
    }, 0);

    icecreams.push(newIceCream);
    return newIceCream;
  }

  static getAll() {
    return icecreams;
  }

  static getById(id) {
    return icecreams.find(ic => ic.id === Number(id));
  }

  static deleteById(id) {
    const index = icecreams.findIndex(ic => ic.id === Number(id));
    if (index === -1) {
      throw new Error('Ice cream not found');
    }

    // Simulate threading - async logging
    setTimeout(() => {
      console.log(`[THREAD] Ice Cream Deleted: ID ${id}`);
    }, 0);

    const deleted = icecreams.splice(index, 1);
    return deleted[0];
  }

  static getTotalCalories() {
    return icecreams.reduce((total, ic) => total + ic.calories, 0);
  }

  static getStats() {
    return {
      totalEntries: icecreams.length,
      totalCalories: this.getTotalCalories(),
      avgCaloriesPerEntry: icecreams.length > 0 ? Math.round(this.getTotalCalories() / icecreams.length) : 0,
      typeBreakdown: this.getTypeBreakdown()
    };
  }

  static getTypeBreakdown() {
    const breakdown = {};
    icecreams.forEach(ic => {
      breakdown[ic.type] = (breakdown[ic.type] || 0) + 1;
    });
    return breakdown;
  }
}

module.exports = IceCreamModel;
