import api from "./axiosInstance";

export const generateQuiz = async (no_of_questions: number, file_name: string) => {
    try {
        const response = await api.post("/quiz/generateQuiz", {
            no_of_questions: no_of_questions,
            file_name: file_name
        });
        return response.data;
    } catch (error) {
        console.error("Error generating quiz:", error);
        throw error;
    }
}