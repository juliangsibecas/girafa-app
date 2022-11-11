import { useRoute } from '@react-navigation/native';
import { useFormikContext } from 'formik';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { HomeStackScreenProps } from '../../../navigation';
import { FontFamily } from '../../../theme';
import { Box } from '../../Box';
import { Button } from '../../Button';
import { Icon } from '../../Icon';
import { Text } from '../../Text';
import { FormikError } from '../FormikError';

type Props = {
  id: string;
  pickCoordinate: () => void;
};

export const CoordinateInput: React.FC<Props> = ({ id, pickCoordinate }) => {
  const { t } = useTranslation();
  const { params } =
    useRoute<HomeStackScreenProps<'PartyCreateForm'>['route']>();
  const { handleChange } = useFormikContext();

  useEffect(() => {
    if (!params || !params.coordinate) return;
    handleChange(`${id}.latitude`)(params.coordinate.latitude.toString());
    handleChange(`${id}.longitude`)(params.coordinate.longitude.toString());
  }, [params]);

  return (
    <>
      <Button small onPress={pickCoordinate}>
        <Box flex row>
          <Icon name="map-pin" color="background" weight={2.5} />
          <Text ml={1} color="background" fontFamily={FontFamily.BOLD}>
            {t('party.location')}
          </Text>
        </Box>
      </Button>
      <FormikError id={id} />
    </>
  );
};
