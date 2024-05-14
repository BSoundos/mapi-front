import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BACKEND_BASE_URL } from '@/data/constants';

// Fonction utilitaire pour obtenir le token depuis le localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

// Action asynchrone pour bloquer un user
export const blockUserAccount = createAsyncThunk(
  'user/blockUserAccount',
  async (userId: number) => {
    // Récupérer le token
    const token = getToken();

    try {
      // Effectuer une requête HTTP pour désactiver la clé d'accès
      const response = await axios.post(
        `${BACKEND_BASE_URL}/accounts-management/user/${userId}/block/`,
        null,
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      );

      // Retourner les données obtenues depuis le serveur si nécessaire
      return response.data;
    } catch (error) {
      // Gérer les erreurs si nécessaire
      console.error('Error blocking user:', error);
      throw error;
    }
  }
);


// Action asynchrone pour debloquer un user
export const unblockUserAccount = createAsyncThunk(
  'user/unblockUserAccount',
  async (userId: number) => {
    // Récupérer le token
    const token = getToken();

    try {
      // Effectuer une requête HTTP pour désactiver la clé d'accès
      const response = await axios.post(
        `${BACKEND_BASE_URL}/accounts-management/user/${userId}/unblock/`,
        null,
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      );

      // Retourner les données obtenues depuis le serveur si nécessaire
      return response.data;
    } catch (error) {
      // Gérer les erreurs si nécessaire
      console.error('Error unblocking user:', error);
      throw error;
    }
  }
);

// Action asynchrone pour bloquer un provider
export const blockProviderAccount = createAsyncThunk(
    'provider/blockProviderAccount',
    async (providerId: number) => {
      // Récupérer le token
      const token = getToken();
  
      try {
        // Effectuer une requête HTTP pour désactiver la clé d'accès
        const response = await axios.post(
          `${BACKEND_BASE_URL}/accounts-management/provider/${providerId}/block/`,
          null,
          {
            headers: {
              Authorization: `Token ${token}`
            }
          }
        );
  
        // Retourner les données obtenues depuis le serveur si nécessaire
        return response.data;
      } catch (error) {
        // Gérer les erreurs si nécessaire
        console.error('Error blocking provider:', error);
        throw error;
      }
    }
  );
  
  
  // Action asynchrone pour debloquer un provider
  export const unblockProviderAccount = createAsyncThunk(
    'provider/unblockProviderAccount',
    async (providerId: number) => {
      // Récupérer le token
      const token = getToken();
  
      try {
        // Effectuer une requête HTTP pour désactiver la clé d'accès
        const response = await axios.post(
          `${BACKEND_BASE_URL}/accounts-management/provider/${providerId}/unblock/`,
          null,
          {
            headers: {
              Authorization: `Token ${token}`
            }
          }
        );
  
        // Retourner les données obtenues depuis le serveur si nécessaire
        return response.data;
      } catch (error) {
        // Gérer les erreurs si nécessaire
        console.error('Error unblocking provider:', error);
        throw error;
      }
    }
  );