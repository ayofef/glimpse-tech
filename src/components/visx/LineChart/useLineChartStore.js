import create from 'zustand';

export const useLineChartStore = create((set) => ({
  data: [],
  setFilteredData: (filteredData) => {
    set((state) => {
      return {
        ...state,
        data: filteredData,
      };
    });
  },
}));

export const setFilteredDataBinder = (state) => state.setFilteredData;
export const filteredDataBinder = (state) => state.data;
