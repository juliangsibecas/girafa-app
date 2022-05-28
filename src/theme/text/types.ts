export enum FontWeight {
  LIGHT = '300',
  REGULAR = '400',
  MEDIUM = '500',
  BOLD = '600',
}

export type Font = {
  fontFamily: string;
  fontSize: number;
  fontWeight: FontWeight;
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
};
