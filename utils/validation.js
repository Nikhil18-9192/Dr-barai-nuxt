import Joi from 'joi'

const AddPatientValidation = (data) => {
  const formSchema = Joi.object({
    name: Joi.string().min(3).max(50).label('Patient Name').required(),
    mobile: Joi.number().min(10).label('Mobile Number').required(),
    address: Joi.string().max(120).label('Address').required(),
  }).required()

  return formSchema.validate(data)
}
const AddPrescriptionValidation = (data) => {
  const formSchema = Joi.object({
    selectedDrugId: Joi.string().min(3).max(50).label('Drugs').required(),
    // dosageFrequency: Joi.string().min(3).max(50).label('Dosage & Frequency'),
    // intake: Joi.string().min(3).max(50).label('Intake'),
    // duration: Joi.number().min(0).label('Duration'),
    // instructions: Joi.string().min(3).max(250).label('Instruction'),
  }).required()

  return formSchema.validate(data)
}
const AddVitalSignValidation = (data) => {
  const formSchema = Joi.object({
    weight: Joi.number().label('Weight'),
    systolic: Joi.number().label('systolic'),
    diastolic: Joi.number().label('diastolic'),
    temperature: Joi.number().label('temperature'),
    respiration: Joi.number().label('respiration'),
    pulse: Joi.number().label('respiration'),
  }).required()

  return formSchema.validate(data)
}
const ClinicalNotesValidation = (data) => {
  const formSchema = Joi.object({
    complaints: Joi.string().min(3).max(250).label('complaints'),
    observations: Joi.string().min(3).max(250).label('observations'),
    diagnoses: Joi.string().min(3).max(250).label('diagnoses'),
    notes: Joi.string().min(3).max(250).label('notes'),
  }).required()

  return formSchema.validate(data)
}
const SendSmsModal = (data) => {
  const formSchema = Joi.object({
    message: Joi.string().min(3).max(250).label('Message').required(),
  }).required()

  return formSchema.validate(data)
}

const consentFormValidation = (data) => {
  return Joi.object({
    drName: Joi.string().required().min(1).max(80).label('Doctor Name'),
    consentDate: Joi.date().required().label('Consent Date'),
    disease: Joi.string().min(1).max(80).required().label('Disease'),
  }).validate(data)
}

const addDrugsValidation = (data) => {
  return Joi.object({
    name: Joi.string().required().min(3).max(25).label('Drug Name'),
    drugType: Joi.string().required().label('Drug Type'),
    strength: Joi.number().required().label('Drug Strength'),
  }).validate(data)
}

export {
  AddPatientValidation,
  AddPrescriptionValidation,
  AddVitalSignValidation,
  ClinicalNotesValidation,
  SendSmsModal,
  consentFormValidation,
  addDrugsValidation,
}
