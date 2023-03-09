import React from "react";
import MapSearchPage from "../components/pages/map/MapSearchPage";

const suggests = [
  { word: 'abc', id: 1 },
  { word: 'def', id: 2 },
  { word: '123', id: 3 },
];

export default function TestMapSearch() {
  return (
    <MapSearchPage suggests={suggests} />
  )
}