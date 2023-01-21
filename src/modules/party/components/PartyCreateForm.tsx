import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik, FormikHelpers } from 'formik';
import {
  Coordinate,
  PartyAvailability,
  usePartyCreateMutation,
  UserCheckPartyValidatingDocument,
  useResponse,
} from '../../../api';
import {
  Box,
  Button,
  FormikTextInput,
  FormikSelect,
  FormikDateInput,
  FormikImageInput,
  FormikCoordinateInput,
} from '../../../components';
import { Maybe } from '../../../types';
import { useNavigation } from '@react-navigation/native';
import { HomeStackScreenProps } from '../../../navigation';
import { usePictureUpload } from '../../picture';
import { useTranslation } from 'react-i18next';

type FormValues = {
  name: string;
  availability: Maybe<PartyAvailability>;
  date: string;
  address: string;
  openBar: string;
  allowInvites: string;
  description: string;
  image: string;
  coordinate: Maybe<Coordinate>;
};

const initialValues: FormValues = {
  name: '',
  availability: null,
  date: '',
  address: '',
  coordinate: null,
  openBar: '',
  allowInvites: '',
  description: '',
  image: '',
};

export const PartyCreateForm: React.FC = () => {
  const [isLoading, setLoading] = useState(false);
  const { t } = useTranslation();
  const { navigate } =
    useNavigation<HomeStackScreenProps<'PartyCreateForm'>['navigation']>();
  const [create] = usePartyCreateMutation({
    refetchQueries: [{ query: UserCheckPartyValidatingDocument }],
  });
  const { uploadParty } = usePictureUpload();
  const { onSuccess, onFormError } = useResponse();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required()
      .min(10)
      .max(25)
      .matches(
        /^[A-Za-z0-9\s]+$/g,
        // TODO
        'Solo puede contener letras, números y espacios.'
      ),
    availability: Yup.string().nullable().required(),
    date: Yup.string().required(),
    address: Yup.string()
      .required()
      .min(10)
      .max(30)
      .matches(
        /^[A-Za-z0-9\s]+$/g,
        // TODO
        'Solo puede contener letras, números y espacios.'
      ),
    openBar: Yup.string().required(),
    description: Yup.string().required().min(20).max(100),
    image: Yup.string().required(),
    coordinate: Yup.object().nullable().required(),
  });

  const handleSubmit = async (
    values: FormValues,
    helpers: FormikHelpers<FormValues>
  ) => {
    try {
      setLoading(true);
      const { image, ...rest } = values;

      const res = await create({
        variables: {
          data: {
            ...rest,
            availability: values.availability!,
            coordinate: {
              latitude: Number(values.coordinate?.latitude),
              longitude: Number(values.coordinate?.longitude),
            },
            openBar: values.openBar === 'yes',
            allowInvites: values.allowInvites === 'yes',
          },
        },
      });

      if (res.errors) {
        throw Error();
      }

      await uploadParty(res.data!.partyCreate, values.image);

      onSuccess({
        title: t('party.components.Create.success.title'),
        description: t('party.components.Create.success.description'),
        time: 4000,
      });
      setLoading(false);
    } catch (e: any) {
      const { messages } = onFormError(e);

      messages && helpers.setErrors(messages);
    }
  };

  const pickCoordinate = () => navigate('PartyCreateMap');

  const partyAvailabilityOptions = [
    PartyAvailability.Public,
    PartyAvailability.Followers,
    PartyAvailability.Following,
    PartyAvailability.Private,
  ];

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, submitForm }) => (
        <>
          <Box flex={1}>
            <FormikTextInput
              id="name"
              placeholder={t('party.components.Create.partyName')}
              mt={1}
            />
            <Box row mt={1}>
              <FormikSelect
                id="availability"
                placeholder={t('party.availability')}
                options={partyAvailabilityOptions.map((value) => ({
                  label: t(`party.availabilities.${value}`),
                  value,
                }))}
              />
            </Box>
            <FormikTextInput
              id="address"
              placeholder={`${t('party.address')} (${t(
                'party.components.Create.addressExample'
              )})`}
              mt={1}
            />
            <Box row mt={1}>
              <FormikSelect
                id="openBar"
                placeholder={t('party.openBar')}
                options={[
                  { label: t('general.yes'), value: 'yes' },
                  { label: t('general.no'), value: 'no' },
                ]}
                mr={1}
              />
              <Box flex={1}>
                <FormikDateInput id="date" placeholder={t('general.date')} />
              </Box>
            </Box>
            {values.availability !== PartyAvailability.Public && (
              <Box row mt={1} style={{ width: '100%' }}>
                <FormikSelect
                  id="allowInvites"
                  placeholder={t('party.components.Create.allowInvitesHelper')}
                  options={[
                    { label: t('general.yes'), value: 'yes' },
                    { label: t('general.no'), value: 'no' },
                  ]}
                />
              </Box>
            )}
            <FormikTextInput
              id="description"
              placeholder={t('party.description')}
              mt={1}
              lines={4}
            />
            <Box row mt={1}>
              <Box mr={1} flex={1}>
                <FormikImageInput id="image" />
              </Box>
              <Box flex={1}>
                <FormikCoordinateInput
                  id="coordinate"
                  pickCoordinate={pickCoordinate}
                />
              </Box>
            </Box>
          </Box>
          <Button onPress={submitForm} isLoading={isLoading}>
            {t('general.continue')}
          </Button>
        </>
      )}
    </Formik>
  );
};
