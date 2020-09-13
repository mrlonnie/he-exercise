'use strict';
const axios = require('axios')

exports.getCommodities = () => {
  return [...new Set(commoditiesData.map(commodity => commodity.COMMODITY))]
}

exports.calculateCommodities = (data) => {
  // Filter Commodities by requested type
  let filteredCommodities = commoditiesData.filter(commodity => {
    return commodity.COMMODITY === data.COMMODITY
  })

  // Calculate Costs
  let commodities = filteredCommodities.map((commodity) => {
    let variableCost = data.PRICE + commodity.VARIABLE_COST
    let obj = {
      COMMODITY: commodity.COMMODITY,
      COUNTRY: commodity.COUNTRY,
      TOTAL_COST: Number((variableCost * data.TONS + commodity.FIXED_OVERHEAD).toFixed(2)), // TOTAL COST PER TRADE
      FIXED_COST: commodity.FIXED_OVERHEAD,
      VARIABLE_COST: Number(variableCost), // COST PER TON
    }
    return obj;
  })

  // Sort descending
  let sortedCommodities = commodities.sort((a, b) => {
    return (b.TOTAL_COST - a.TOTAL_COST);
  })

  return sortedCommodities;
}
