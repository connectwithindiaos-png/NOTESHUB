const { body } = require('express-validator');
const { validate } = require('../middlewares/validate');

const createCourseValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Course name is required')
    .isLength({ max: 255 })
    .withMessage('Course name must be at most 255 characters'),
  body('fullName')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Full name must be at most 500 characters'),
  body('description')
    .optional()
    .trim(),
  body('longDescription')
    .optional()
    .trim(),
  body('icon')
    .optional()
    .trim()
    .isLength({ max: 50 }),
  body('color')
    .optional()
    .trim()
    .isLength({ max: 50 }),
  body('bgColor')
    .optional()
    .trim()
    .isLength({ max: 50 }),
  body('duration')
    .optional()
    .trim()
    .isLength({ max: 50 }),
  body('totalSemesters')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Total semesters must be a positive integer'),
  body('totalSubjects')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Total subjects must be a positive integer'),
  body('keywords')
    .optional()
    .trim(),
  body('brochurePoints')
    .optional()
    .isArray()
    .withMessage('Brochure points must be an array'),
  validate,
];

const updateCourseValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage('Course name must be at most 255 characters'),
  body('fullName')
    .optional()
    .trim()
    .isLength({ max: 500 }),
  body('description')
    .optional()
    .trim(),
  body('longDescription')
    .optional()
    .trim(),
  body('icon')
    .optional()
    .trim()
    .isLength({ max: 50 }),
  body('color')
    .optional()
    .trim()
    .isLength({ max: 50 }),
  body('bgColor')
    .optional()
    .trim()
    .isLength({ max: 50 }),
  body('duration')
    .optional()
    .trim()
    .isLength({ max: 50 }),
  body('totalSemesters')
    .optional()
    .isInt({ min: 0 }),
  body('totalSubjects')
    .optional()
    .isInt({ min: 0 }),
  body('keywords')
    .optional()
    .trim(),
  body('brochurePoints')
    .optional()
    .isArray(),
  body('isActive')
    .optional()
    .isBoolean(),
  validate,
];

module.exports = { createCourseValidation, updateCourseValidation };
