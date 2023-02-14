import { Router } from 'express';
import { Series, Sections } from '@/models/series/section.model';

const router = Router();
const seriesPath = '/series';
const sectionPath = '/sections';
// const questionPath = '/questions';
/**
 * *********
 * SERIES API
 * **********
 */

/**
 * Create Series
 */
router.post(seriesPath, async (req, res) => {
  const _data = req.body;
  try {
    const response = await Series.create(_data);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});
/**
 * Get All Series
 */
router.get(seriesPath, async (req, res) => {
  try {
    const response = await Series.find();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});
/**
 * Get Series By Id
 */
router.get(`${seriesPath}/:series_id`, async (req, res) => {
  try {
    const response = await Series.findById({ _id: req.params.series_id });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});
/**
 * Delete A Series based in ID
 */
router.put(`${seriesPath}/:id`, async (req, res) => {
  const _data = req.body;
  try {
    const response = await Series.findByIdAndUpdate({ _id: req.params.id }, _data);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});
/**
 * Delete A Series based in ID
 */
router.delete(`${seriesPath}/:id`, async (req, res) => {
  try {
    const response = await Series.deleteOne({ _id: req.params.id });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

/**
 * Get Single Series With Section
 */
router.get(`${seriesPath}/sections/:series_id`, async (req, res) => {
  try {
    const response = await Series.findById({ _id: req.params.series_id }).populate({
      path: 'sections',
      // select: '_id',
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

/**
 * ************
 * SECTION API
 * ************
 */

/**
 * Create Section with Series ID
 */
router.post(`${sectionPath}/:series_id`, async (req, res) => {
  const _data = req.body;
  try {
    Sections.create(_data, async (err: any, data: any) => {
      if (err) {
        return res.status(500).json(err);
      }
      await Series.findByIdAndUpdate(req.params.series_id, {
        $push: {
          sections: data._id,
        },
      });
      res.status(200).json(data);
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

/**
 * Update Section with Series ID
 */
router.put(`${sectionPath}/:section_id/:series_id`, async (req, res) => {
  const _data = req.body;
  try {
    Sections.findByIdAndUpdate({ id: req.params.section_id }, _data, async (err: any, data: any) => {
      if (err) {
        return res.status(500).json(err);
      }
      await Series.findByIdAndUpdate(req.params.series_id, {
        $push: {
          sections: data._id,
        },
      });
      res.status(200).json(data);
    });
  } catch (error) {
    res.status(500).json(error);
  }
});
/**
 * Get All Sections
 */
router.get(`${sectionPath}`, async (req, res) => {
  try {
    const data = await Sections.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});
/**
 * Get Single Section
 */
router.get(`${sectionPath}/:id`, async (req, res) => {
  try {
    const data = await Sections.findById({ _id: req.params.id });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});
/**
 * Delete Section By ID
 */
router.delete(`${sectionPath}/:id`, async (req, res) => {
  try {
    const data = await Sections.deleteOne({ _id: req.params.id });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
