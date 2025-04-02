import Joi from "joi";

export const schema = Joi.object({
  first_name: Joi.string().trim().min(2).max(50).required().messages({
    'any.required': 'First name is required',
    'string.min': 'First name must be at least 2 characters',
    'string.max': 'First name cannot exceed 50 characters'
  }),
  middle_name: Joi.string().trim().max(50).allow(''),
  last_name: Joi.string().trim().min(2).max(50).required().messages({
    'any.required': 'Last name is required',
    'string.min': 'Last name must be at least 2 characters', 
    'string.max': 'Last name cannot exceed 50 characters'
  }),
  guardian: Joi.string().trim().min(2).max(100).required().messages({
    'any.required': 'Guardian name is required',
    'string.min': 'Guardian name must be at least 2 characters',
    'string.max': 'Guardian name cannot exceed 100 characters'
  }),
  relation_with_guardian: Joi.string().valid('Father', 'Mother', 'Spouse').required().messages({
    'any.required': 'Relation is required',
    'any.only': 'Relation must be Father, Mother or Spouse'
  }),
  date_of_birth: Joi.date().max('now').required().messages({
    'date.base': 'Please enter a valid date',
    'date.max': 'Date of birth cannot be in the future'
  }),
  gender: Joi.string().valid('Male', 'Female', 'Other').required().messages({
    'any.required': 'Gender is required',
    'any.only': 'Gender must be Male, Female or Other'
  }),
  marital_status: Joi.string().valid('Single', 'Married', 'Divorced', 'Widowed').required().messages({
    'any.required': 'Marital status is required',
    'any.only': 'Invalid marital status selected'
  }),
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    'any.required': 'Email is required',
    'string.email': 'Please enter a valid email address'
  }),
  mobile: Joi.string().pattern(/^\d{10}$/).required().messages({
    'any.required': 'Mobile number is required',
    'string.pattern.base': 'Mobile number must be exactly 10 digits'
  }),
  alternate_number: Joi.string().pattern(/^\d{10}$/).allow('').messages({
    'string.pattern.base': 'Alternate number must be exactly 10 digits'
  }),
  department: Joi.string().trim().min(2).max(50).required().messages({
    'any.required': 'Department is required',
    'string.min': 'Department must be at least 2 characters',
    'string.max': 'Department cannot exceed 50 characters'
  }),
  staff_type: Joi.string().valid('Full-time', 'Part-time', 'Contract', 'Temporary').required().messages({
    'any.required': 'Staff type is required',
    'any.only': 'Invalid staff type selected'
  }),
  income: Joi.number().min(0).max(999999999).required().messages({
    'number.base': 'Income must be a number',
    'number.min': 'Income cannot be negative',
    'number.max': 'Income value is too large'
  }),
  employment_status: Joi.string().valid('active', 'retired', 'resigned', 'terminated').required().messages({
    'any.required': 'Employment status is required',
    'any.only': 'Invalid employment status selected'
  })
});