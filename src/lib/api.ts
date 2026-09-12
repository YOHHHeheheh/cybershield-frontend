import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const graphApi = {
  search: async (query: string, depth: number = 2) => {
    const response = await api.get('/graph/search', {
      params: { query, depth },
    });
    return response.data;
  },
  
  analyzeChokepoints: async (elements: any) => {
    const response = await api.post('/graph/analyze/chokepoints', elements);
    return response.data;
  },
  
  expandNode: async (nodeId: string, currentIds: string[]) => {
    const response = await api.post('/graph/expand', {
      node_id: nodeId,
      current_visible_ids: currentIds,
      limit: 25
    });
    return response.data;
  }
};
