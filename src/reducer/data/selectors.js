import {createSelector} from "reselect";
import NameSpaces from "../name-spaces";

const NAME_SPACE = NameSpaces.DATA;

export const getData = (state) => {
  return state[NAME_SPACE].data;
};

export const getDataPromo = (state) => {
  return state[NAME_SPACE].dataPromo;
};

export const getDataFavorites = (state) => {
  return state[NAME_SPACE].dataFavorites;
};

export const getDataItemReviews = (state) => {
  return state[NAME_SPACE].dataItemReviews;
};

export const getFilterCurrent = (state) => {
  return state[NAME_SPACE].currentFilter;
};

export const getDataItemCurrent = (state) => {
  return state[NAME_SPACE].dataItemCurrent;
};

export const getAllFilters = createSelector(getData, (data) => data.map((dataItem) => dataItem.genre));

export const getFilters = createSelector(getAllFilters, (filters) => ([`All genres`, ...new Set(filters)]));

export const getFilteredData = createSelector(
    getData,
    getFilterCurrent,
    (data, currentFilter) => {
      return (currentFilter === `All genres`) ? data : data.filter((dataItem) => dataItem.genre === currentFilter);
    });
