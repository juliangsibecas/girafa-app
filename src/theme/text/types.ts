export enum FontFamily {
  LIGHT = 'PlusJakartaSans-Light',
  REGULAR = 'PlusJakartaSans-Regular',
  MEDIUM = 'PlusJakartaSans-Medium',
  SEMIBOLD = 'PlusJakartaSans-SemiBold',
  BOLD = 'PlusJakartaSans-Bold',
}

export type Font = {
  fontFamily: FontFamily;
  fontSize: number;
  lineHeight: number;
  color: string;
};

export type Text = {
  h1: Font;
  h2: Font;
  h3: Font;
  h4: Font;
  h5: Font;
  h6: Font;

  primary: Font;
  secondary: Font;

  button: Font;

  hint: Font;
};
