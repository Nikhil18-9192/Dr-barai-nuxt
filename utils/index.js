const dosageFrequency = [
  'twice_daily',
  'three_times_a_day',
  'four_times_a_day',
  'every_four_hours',
  'every_2_hours',
  'every_other_hour',
  'every_day',
  'every_other_day',
  'three_times_a_week',
  'immediately',
  'as_needed',
  'once_a_week',
  'twice_a_week',
]
const durationUnits = ['day', 'week', 'month', 'year', 'sos']
const bpMeasurementPositions = ['standing', 'seating']
const tempMeasurementPositions = [
  'axillary',
  'oral',
  'tympanic',
  'temporal',
  'rectal',
]
const StockUnits = ['bottles', 'strips']

const generateConsentText = (consentData) => {
  const { drName, disease } = consentData

  return [
    `I, the undersigned have been explained by my/our Physician <strong>Dr. ${drName}</strong> that I am/We are suffering from <strong>${disease}</strong> disease.`,

    `I/We voluntarily give consent for the therapy. I/We also know and undersant that there is no guarantee of success of the said procedure ie. may/may not be successfull.`,

    `I/We also understand that the said therapy does not involve indulgive in any sexual activity which is against the law of this country as well as agains the low of nature.`,

    `I/We have already acknowledged that fees once paid is not refundable by any means.`,
  ]
}

export {
  dosageFrequency,
  durationUnits,
  bpMeasurementPositions,
  tempMeasurementPositions,
  StockUnits,
  generateConsentText,
}
