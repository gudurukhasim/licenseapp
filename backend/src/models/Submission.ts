import mongoose from 'mongoose';

const SubmissionSchema = new mongoose.Schema({
  fullName: String,
  phoneNumber: String,
  email: String,
  dob: Date,
  address: String,
  documents: {
    aadhaar: String,
    photograph: String,
    signature: String,
  },
  timestamp: { type: Date, default: Date.now },
  status: { type: String, default: 'Pending' },
  notes: String,
  submissionId: String,
});

export const Submission = mongoose.model('Submission', SubmissionSchema);
