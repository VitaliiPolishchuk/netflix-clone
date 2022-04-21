import { BrowseContainer } from "../containers/browse";
import { useContent } from "../hooks";
import selectionFilter from "../utils/selection-filter";

export default function Browse() {
  const { series } = useContent("series");
  const { films } = useContent("films");
  console.log(series);
  const slides = selectionFilter({ series, films });
  console.log(slides);
  return <BrowseContainer slides={slides} />;
}
