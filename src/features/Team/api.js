import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api';

export const fetchMembers = async (page = 1) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/members?page=${page}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
};

export const fetchMemberById = async (memberId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/members/${memberId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
};

export const createMember = async (memberData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/members`, memberData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
};

export const updateMember = async (memberData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/members/${memberData._id}`, memberData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
};

export const deleteMember = async (memberId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/members/${memberId}`);
        return memberId; // Assuming you want to return the deleted memberId for UI updates
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
};

export const deleteMembers = async (memberIds) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/members`, {
            data: memberIds,
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
};



