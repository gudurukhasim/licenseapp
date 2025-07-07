// import { Request, Response } from 'express';
// import { Submission } from '../models/Submission';
// import { sendEmail } from '../services/emailService';
// import { v4 as uuidv4 } from 'uuid';

// export const submitApplication = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { fullName, phoneNumber, email, dob, address } = req.body;
//     const files = req.files as {
//       [fieldname: string]: Express.Multer.File[];
//     };

//     const age = new Date().getFullYear() - new Date(dob).getFullYear();
//     if (age < 18) {
//       res.status(400).json({ message: 'Age must be at least 18' });
//       return;
//     }

//     const submissionId = uuidv4();
//     const submission = new Submission({
//       fullName,
//       phoneNumber,
//       email,
//       dob,
//       address,
//       documents: {
//         aadhaar: files.aadhaar[0].filename,
//         photograph: files.photograph[0].filename,
//         signature: files.signature[0].filename,
//       },
//       submissionId,
//     });

//     await submission.save();

//     // Send confirmation emails (assumes sendEmail returns Promise)
//     await sendEmail('gudurukhasim@gmail.com', 'New Submission', JSON.stringify(submission, null, 2));
//     await sendEmail(email, 'Submission Received', `Submission ID: ${submissionId}`);

//     res.json({ message: 'Submitted successfully', submissionId });
//   } catch (err) {
//     console.error('Submission failed:', err);
//     res.status(500).json({ message: 'Submission failed', error: err });
//   }
// };

import { Request, Response } from 'express';
import { Submission } from '../models/Submission';
import { sendRealEmail, sendMockEmail } from '../services/emailService';
import { v4 as uuidv4 } from 'uuid';

export const submitApplication = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, phoneNumber, email, dob, address } = req.body;
    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    const age = new Date().getFullYear() - new Date(dob).getFullYear();
    if (age < 18) {
      res.status(400).json({ message: 'Age must be at least 18' });
      return;
    }

    const submissionId = uuidv4();
    const submission = new Submission({
      fullName,
      phoneNumber,
      email,
      dob,
      address,
      documents: {
        aadhaar: files.aadhaar[0].filename,
        photograph: files.photograph[0].filename,
        signature: files.signature[0].filename,
      },
      submissionId,
    });

    await submission.save();

    // Real Email to Admin
    await sendRealEmail(
      'gudurukhasim@gmail.com',
      'New Submission Received',
      JSON.stringify(submission, null, 2)
    );

    // Mock Email to Customer
    await sendMockEmail(
      email,
      'Submission Received',
      `Hi ${fullName}, your submission ID is ${submissionId}.`
    );

    res.json({ message: 'Submitted successfully', submissionId });
  } catch (err) {
    console.error('Submission failed:', err);
    res.status(500).json({ message: 'Submission failed', error: err });
  }
};
