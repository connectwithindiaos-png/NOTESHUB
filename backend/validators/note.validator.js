const { body } = require('express-validator');
const { validate } = require('../middlewares/validate');

const createNoteValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 500 })
    .withMessage('Title must be at most 500 characters'),
  body('subjectId')
    .notEmpty()
    .withMessage('Subject ID is required')
    .isUUID()
    .withMessage('Invalid Subject ID'),
  body('semesterId')
    .notEmpty()
    .withMessage('Semester ID is required')
    .isUUID()
    .withMessage('Invalid Semester ID'),
  body('courseId')
    .notEmpty()
    .withMessage('Course ID is required')
    .isUUID()
    .withMessage('Invalid Course ID'),
  body('description')
    .optional()
    .trim(),
  body('content')
    .optional()
    .trim(),
  body('fileType')
    .optional()
    .trim()
    .isLength({ max: 50 }),
  body('fileId')
    .optional()
    .trim()
    .isLength({ max: 500 }),
  body('driveUrl')
    .optional()
    .isURL()
    .withMessage('Drive URL must be a valid URL'),
  body('previewUrl')
    .optional()
    .isURL(),
  body('downloadUrl')
    .optional()
    .isURL(),
  body('thumbnailUrl')
    .optional()
    .isURL(),
  body('fileSize')
    .optional()
    .isInt({ min: 0 }),
  body('pageCount')
    .optional()
    .isInt({ min: 0 }),
  body('tags')
    .optional()
    .isArray(),
  body('isFeatured')
    .optional()
    .isBoolean(),
  body('isFree')
    .optional()
    .isBoolean(),
  validate,
];

const updateNoteValidation = [
  body('title')
    .optional()
    .trim()
    .isLength({ max: 500 }),
  body('description')
    .optional()
    .trim(),
  body('content')
    .optional()
    .trim(),
  body('fileType')
    .optional()
    .trim()
    .isLength({ max: 50 }),
  body('fileId')
    .optional()
    .trim()
    .isLength({ max: 500 }),
  body('driveUrl')
    .optional()
    .isURL(),
  body('previewUrl')
    .optional()
    .isURL(),
  body('downloadUrl')
    .optional()
    .isURL(),
  body('thumbnailUrl')
    .optional()
    .isURL(),
  body('fileSize')
    .optional()
    .isInt({ min: 0 }),
  body('pageCount')
    .optional()
    .isInt({ min: 0 }),
  body('tags')
    .optional()
    .isArray(),
  body('isFeatured')
    .optional()
    .isBoolean(),
  body('isFree')
    .optional()
    .isBoolean(),
  body('isActive')
    .optional()
    .isBoolean(),
  validate,
];

module.exports = { createNoteValidation, updateNoteValidation };
