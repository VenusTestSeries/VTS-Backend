import { Router } from 'express';
import {
  createSeries,
  deleteSingleSeries,
  getAllSeries,
  getAllSeriesWithCourse,
  getSingleSeries,
  updateSingleSeries,
  getSingleSeriesWithSections,
} from '@/controllers/series.controller';

const router = Router({ mergeParams: true, caseSensitive: true, strict: true });

/**
 * Get All Series
 */
router.get('/series', getAllSeries);

/**
 * Get All With Course Series
 */

router.get(`/series/:course_id/course`, getAllSeriesWithCourse);

/**
 * Get Series By Id
 */

router.get(`/series/:series_id`, getSingleSeries);

/**
 * Get Single Series With Sections
 */
// router.get(`/series/sections/:series_id`, getSingleSeriesWithSections);
router.get(`/series/:series_id/sections`, getSingleSeriesWithSections);

/**
 * Create Series
 */
router.post('/series', createSeries);

/**
 * Update A Series based in ID
 */

router.patch(`/series/:series_id`, updateSingleSeries);

/**
 * Delete A Series based in ID
 */

router.delete(`/series/:series_id`, deleteSingleSeries);

export default router;
