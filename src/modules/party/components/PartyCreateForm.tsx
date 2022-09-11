import React from 'react';
import * as Yup from 'yup';
import { Formik, FormikHelpers } from 'formik';
import {
  Coordinate,
  PartyAvailability,
  usePartyCreateMutation,
  useResponse,
} from '../../../api';
import {
  Box,
  Button,
  FormikTextInput,
  FormikSelect,
  FormikDateInput,
  FormikImageInput,
  CoordinateInput,
} from '../../../components';
import { Maybe } from '../../../types';
import { useNavigation } from '@react-navigation/native';
import { HomeStackScreenProps } from '../../../navigation';
import { usePictureUpload } from '../../picture';
import { GraphQLErrors } from '@apollo/client/errors';
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
  const { t } = useTranslation();
  const { navigate } =
    useNavigation<HomeStackScreenProps<'PartyCreateForm'>['navigation']>();
  const [create, { loading: isLoading }] = usePartyCreateMutation();
  const { uploadParty } = usePictureUpload();
  const { onSuccess, onError } = useResponse();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required()
      .min(10)
      .max(25)
      .matches(
        /^[A-Za-z0-9\s]+$/g,
        'Solo puede contener letras, numeros y espacios.'
      ),
    availability: Yup.string().nullable().required(),
    date: Yup.string().required(),
    address: Yup.string()
      .required()
      .min(10)
      .max(30)
      .matches(
        /^[A-Za-z0-9\s]+$/g,
        'Solo puede contener letras, numeros y espacios.'
      ),
    openBar: Yup.string().required(),
    description: Yup.string().required().min(20).max(100),
    image: Yup.string().required(),
    coordinate: Yup.object().nullable().required(),
  });

  const handleSubmit = async (
    values: FormValues,
    { setErrors }: FormikHelpers<FormValues>
  ) => {
    try {
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

      onSuccess();

      navigate('Map');
    } catch (e: any) {
      const errors = e.graphQLErrors as GraphQLErrors;
      const error = errors[0];

      if (error && error.message === 'VALIDATION_ERROR') {
        setErrors(error.extensions);
        return;
      }

      onError();

      console.log(e);
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
          <Box flex flexGrow={1}>
            <FormikTextInput id="name" placeholder={t('general.name')} mt={1} />
            <Box flex row mt={1}>
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
            <Box flex row mt={1}>
              <FormikSelect
                id="openBar"
                placeholder={t('party.openBar')}
                options={[
                  { label: t('general.yes'), value: 'yes' },
                  { label: t('general.no'), value: 'no' },
                ]}
                mr={1}
              />
              <Box flexGrow={1}>
                <FormikDateInput id="date" placeholder={t('general.date')} />
              </Box>
            </Box>
            {values.availability !== PartyAvailability.Public && (
              <Box flex row mt={1}>
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
            <Box flex row mt={1}>
              <Box mr={1} flexGrow={1}>
                <FormikImageInput id="image" />
              </Box>
              <Box flexGrow={1}>
                <CoordinateInput
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
