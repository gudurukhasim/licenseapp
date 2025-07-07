
// import { Request, Response } from 'express';
// import { Submission } from '../models/Submission';
// import { sendMockEmail } from '../services/emailService';

// export const getAllSubmissions = async (_: Request, res: Response): Promise<void> => {
//   try {
//     const submissions = await Submission.find();
//     res.json(submissions);
//   } catch (error) {
//     console.error('Error fetching submissions:', error);
//     res.status(500).json({ message: 'Failed to fetch submissions' });
//   }
// };

// export const updateStatus = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { id } = req.params;
//     const { status, notes } = req.body;

//     const submission = await Submission.findByIdAndUpdate(
//       id,
//       { status, notes },
//       { new: true }
//     );

//     if (submission) {
//       if (submission.email) {
//         await sendMockEmail(
//           submission.email,
//           'Status Update',
//           `Dear ${submission.fullName}, your application status is now: ${status}.`
//         );
//       } else {
//         console.warn(`No email found for submission ID: ${id}`);
//       }

//       res.json(submission);
//     } else {
//       res.status(404).json({ message: 'Submission not found' });
//     }
//   } catch (error) {
//     console.error('Error updating status:', error);
//     res.status(500).json({ message: 'Failed to update status' });
//   }
// };

import { Request, Response } from 'express';
import { Submission } from '../models/Submission';
import { sendMockEmail } from '../services/emailService';

// Fetch All Submissions with Sort & Filter
export const getAllSubmissions = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, name, sortBy, sortOrder = 'asc' } = req.query;

    const filter: any = {};
    if (status) {
      filter.status = status;
    }
    if (name) {
      filter.fullName = { $regex: name, $options: 'i' }; // Case-insensitive name search
    }

    let sort: any = {};
    if (sortBy === 'date') {
      sort.timestamp = sortOrder === 'desc' ? -1 : 1;
    } else if (sortBy === 'name') {
      sort.fullName = sortOrder === 'desc' ? -1 : 1;
    } else if (sortBy === 'status') {
      sort.status = sortOrder === 'desc' ? -1 : 1;
    }

    const submissions = await Submission.find(filter).sort(sort);
    res.json(submissions);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ message: 'Failed to fetch submissions' });
  }
};

// Update Status
export const updateStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const submission = await Submission.findByIdAndUpdate(
      id,
      { status, notes },
      { new: true }
    );

    if (submission) {
      if (submission.email) {
        await sendMockEmail(
          submission.email,
          'Status Update',
          `Dear ${submission.fullName}, your application status is now: ${status}.`
        );
      } else {
        console.warn(`No email found for submission ID: ${id}`);
      }

      res.json(submission);
    } else {
      res.status(404).json({ message: 'Submission not found' });
    }
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ message: 'Failed to update status' });
  }
};



