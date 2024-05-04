import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BACKEND_BASE_URL } from '@/data/constants';

// Fonction utilitaire pour obtenir le token depuis le localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

// Action asynchrone pour désactiver une clé d'accès
export const disableAccessKey = createAsyncThunk(
  'accessKeys/disableAccessKey',
  async (accessKeyId: number) => {
    // Récupérer le token
    const token = getToken();

    try {
      // Effectuer une requête HTTP pour désactiver la clé d'accès
      const response = await axios.post(
        `${BACKEND_BASE_URL}/apis_management/access-key/${accessKeyId}/disable/`,
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
      console.error('Error disabling access key:', error);
      throw error;
    }
  }
);


// Action asynchrone pour désactiver une clé d'accès
export const enableAccessKey = createAsyncThunk(
  'accessKeys/disableAccessKey',
  async (accessKeyId: number) => {
    // Récupérer le token
    const token = getToken();

    try {
      // Effectuer une requête HTTP pour désactiver la clé d'accès
      const response = await axios.post(
        `${BACKEND_BASE_URL}/apis_management/access-key/${accessKeyId}/enable/`,
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
      console.error('Error disabling access key:', error);
      throw error;
    }
  }
);


// Action asynchrone pour supprimer une clé d'accès
export const deleteAccessKey = createAsyncThunk(
    'accessKeys/deleteAccessKey',
    async (accessKeyId: number) => {
      // Récupérer le token
      const token = getToken();
  
      try {
        // Effectuer une requête HTTP pour désactiver la clé d'accès
        const response = await axios.delete(
          `${BACKEND_BASE_URL}/apis_management/access-key/${accessKeyId}/delete/`,
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
        console.error('Error deleting access key:', error);
        throw error;
      }
    }
  );