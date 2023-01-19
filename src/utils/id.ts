export const isId = (str: string) =>
  /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi.test(
    str
  );

export const getIdOrField = ({
  id,
  str,
  field,
}: {
  id?: string;
  str?: string;
  field: string;
}) => {
  if (id) {
    return { id };
  }

  if (str) {
    if (isId(str)) {
      return {
        id,
      };
    }

    return {
      [field]: str,
    };
  }

  return {
    id,
    [field]: str,
  };
};
