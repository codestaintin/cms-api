import express, { Router } from 'express';
import { validate } from '../../modules/validate';
import { meetingTypeValidation, meetingTypeController } from '../../modules/meeting_type';
import { meetingValidation, meetingController } from '../../modules/meeting';
import { auth } from '../../modules/auth';

const router: Router = express.Router();

router
    .route('/')
    .post(validate(meetingTypeValidation.createMeetingType), meetingTypeController.createMeetingType)
    .get(validate(meetingTypeValidation.getMeetingTypes), meetingTypeController.getMeetingTypes);

router
    .route('/:meetingTypeId')
    .get(validate(meetingTypeValidation.getMeetingType), meetingTypeController.getMeetingType)
    .patch(validate(meetingTypeValidation.updateMeetingType), meetingTypeController.updateMeetingType)
    .delete(validate(meetingTypeValidation.deleteMeetingType), meetingTypeController.deleteMeetingType);

router
    .route('/branch/:branchId')
    .post(auth('manageBranches'), validate(meetingValidation.createMeeting), meetingController.createMeeting);

router
    .route('/branch/meetings')
    .get(auth('manageBranches'), validate(meetingValidation.getMeetings), meetingController.getMeetings);

router
    .route('/branch/:meetingId')
    .get(auth('manageBranches'), validate(meetingValidation.getMeeting), meetingController.getMeeting)
    .patch(auth('manageBranches'), validate(meetingValidation.updateMeeting), meetingController.updateMeeting)
    .delete(auth('manageBranches'), validate(meetingValidation.deleteMeeting), meetingController.deleteMeeting);

export default router;
