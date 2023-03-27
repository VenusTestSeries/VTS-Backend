import { Request, Response } from 'express';
import Series from '@/models/series/series.model';
import Sections from '@/models/series/section.model';

/**
 * ************
 * SECTION API
 * ************
 */

/**
 * Create Section with Series ID
 */
export const createSectionWithSeriesId = async (req: Request, res: Response) => {
  try {
    const sectionData = await Sections.create(req.body);
    await Series.findByIdAndUpdate(req.params.series_id, {
      $push: {
        sections: sectionData._id,
      },
    });
    res.status(200).json(sectionData);
  } catch (error) {
    res.status(500).json(error);
  }
};

/**
 * Update Section with Series ID
 */
export const updateSectionWithSeriesId = async (req: Request, res: Response) => {
  try {
    const sectionData = await Sections.findByIdAndUpdate({ _id: req.params.section_id }, req.body);
    await Series.findByIdAndUpdate(req.params.series_id, {
      $push: {
        sections: sectionData._id,
      },
    });
    res.status(200).json(sectionData);
  } catch (error) {
    res.status(500).json(error);
  }
};
/**
 * Get All Sections
 */
export const getAllSections = async (req: Request, res: Response) => {
  try {
    const data = await Sections.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};
/**
 * Get Single Section
 */
export const getSingleSection = async (req: Request, res: Response) => {
  try {
    const data = await Sections.findById({ _id: req.params.id });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};
/**
 * Delete Section By ID
 */
export const deleteSingleSection = async (req: Request, res: Response) => {
  try {
    const data = await Sections.deleteOne({ _id: req.params.id });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Sections.create(req.body, async (err: any, data: any) => {
//   if (err) {
//     return res.status(500).json(err);
//   }
//   await Series.findByIdAndUpdate(req.params.series_id, {
//     $push: {
//       sections: data._id,
//     },
//   });
//   res.status(200).json(data);
// });
// Sections.findByIdAndUpdate({ id: req.params.section_id }, req.body, async (err: any, data: any) => {
//   if (err) {
//     return res.status(500).json(err);
//   }
//   await Series.findByIdAndUpdate(req.params.series_id, {
//     $push: {
//       sections: data._id,
//     },
//   });
//   res.status(200).json(data);
// });
