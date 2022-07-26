export const getSearchOptions = (keywords: string[]): Object => {
  return {
    isCaseSensitive: false,
    shouldSort: true,
    threshold: 0.3,
    //includeMatches: true,
    // findAllMatches: false,
    // includeScore: false,
    // minMatchCharLength: 1,
    // location: 0,
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    // fieldNormWeight: 1,
    keys: keywords
  };
}

