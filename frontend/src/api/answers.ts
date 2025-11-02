import api from "./axiosInstance";

export const getAnswers = async (question: string, fileName: string) => {
    try {
        const response = await api.post('/quiz/askQuestions', {
            question : question,
            file_name : fileName
        });
        return response.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
};