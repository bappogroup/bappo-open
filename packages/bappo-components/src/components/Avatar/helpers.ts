export const SizeToRadius = {
  large: 32,
  medium: 20,
};

export const getInitials = (name: string) => {
  if (!name) return '';
  const nameSegs = name.toUpperCase().split(' ');
  if (nameSegs.length === 1) {
    return `${nameSegs[0].charAt(0)}`;
  } else if (nameSegs.length > 1) {
    return `${nameSegs[0].charAt(0)}${nameSegs[1].charAt(0)}`;
  }
  return '';
};
