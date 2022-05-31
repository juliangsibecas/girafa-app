export type UiKeys = Partial<{
  m: number;
  mt: number;
  mb: number;
  ml: number;
  mr: number;
  mx: number;
  my: number;

  p: number;
  pt: number;
  pb: number;
  pl: number;
  pr: number;
  px: number;
  py: number;

  flex: boolean;
  flexGrow: number;
  row: boolean;
  column: boolean;

  bgColor: 'primary' | 'secondary' | string;
  borderRadius: number;

  vcenter: boolean;
  hcenter: boolean;
  center: boolean;

  textCenter: boolean;
  color: 'primary' | 'secondary' | 'background' | string;

  height: 'screen' | number;
  width: 'screen' | number;
  fullWidth: boolean;
}>;
