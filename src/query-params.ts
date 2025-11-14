const createQueryParams = (object: Record<string, string>): string => {
  if (!object) return '';

  return Object.entries(object)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    )
    .join('&');
};

export default createQueryParams;
