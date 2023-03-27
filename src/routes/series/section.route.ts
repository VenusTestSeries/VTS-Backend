import { Router } from 'express';
import {
  createSectionWithSeriesId,
  deleteSingleSection,
  getAllSections,
  getSingleSection,
  updateSectionWithSeriesId,
} from '@/controllers/section.controller';

const router = Router({ mergeParams: true, caseSensitive: true, strict: true });

/**
 * Get All Sections
 */

router.get(`/sections`, getAllSections);
/**
 * Get Single Section
 */
router.get(`/sections/:id`, getSingleSection);
/**
 * Create Section with Series ID
 */
router.post(`/sections/create/:series_id`, createSectionWithSeriesId);
/**
 * Update Section with Series ID
 */
router.put(`/sections/update/:section_id/:series_id`, updateSectionWithSeriesId);
/**
 * Delete Section By ID
 */
router.delete(`/sections/delete/:id`, deleteSingleSection);

export default router;
