import { errorHandler, requestHandler } from '../_utils/index';

const address = 'usr/feedback/';
const service = 'Feedback';

class FeedbackService {
    async create(feedback) {
        try {
            const payload = {
                userId: feedback.userId,
                email: feedback.email,
                subject: feedback.subject,
                body: feedback.body
            };

            const res = await requestHandler(
                service,
                'create',
                address,
                payload
            );

            return Promise.resolve(res);
        } catch (err) {
            await errorHandler(service, 'create', err);
            return Promise.reject(err);
        };
    };

};
export default new FeedbackService();