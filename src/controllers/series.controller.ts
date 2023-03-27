import { Request, Response } from 'express';
import Series from '@/models/series/series.model';

/**
 * *********
 * SERIES API
 * **********
 */

/**
 * Create Series
 */
export const createSeries = async (req: Request, res: Response) => {
  const _data = req.body;
  try {
    const response = await Series.create(_data);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

/**
 * Get All Series
 */

export const getAllSeries = async (req: Request, res: Response) => {
  try {
    const response = await Series.find();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};
/**
 * Get All With Course Series
 */
export const getAllSeriesWithCourse = async (req: Request, res: Response) => {
  const course = req.params.course_id as string;
  try {
    const courseTags = course.split('+');
    const response = await Series.find();
    const filterByCourse = response.filter(item => item.course.some(item => courseTags.includes(item)));
    if (course) {
      res.status(200).json(filterByCourse);
    } else {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
/**
 * Get Series By Id
 */
export const getSingleSeries = async (req: Request, res: Response) => {
  try {
    const response = await Series.findById({ _id: req.params.series_id });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};
/**
 * Update A Series based in ID
 */
export const updateSingleSeries = async (req: Request, res: Response) => {
  const _data = req.body;
  try {
    const response = await Series.findByIdAndUpdate({ _id: req.params.series_id }, _data);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};
/**
 * Delete A Series based in ID
 */
export const deleteSingleSeries = async (req: Request, res: Response) => {
  try {
    const response = await Series.deleteOne({ _id: req.params.series_id });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};
/**
 * Get Single Series With Sections
 */
export const getSingleSeriesWithSections = async (req: Request, res: Response) => {
  try {
    const response = await Series.findById({ _id: req.params.series_id }).populate({
      path: 'sections',
      // select: '_id',
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};
