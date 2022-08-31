import React, { useMemo } from 'react';
import * as Yup from 'yup';
import { Formik, FormikHelpers } from 'formik';
import {
  Coordinate,
  PartyAvailability,
  usePartyCreateMutation,
} from '../../../api';
import {
  Box,
  Button,
  FormikTextInput,
  FormikSelect,
  FormikDateInput,
  FormikImageInput,
  CoordinateInput,
  Text,
} from '../../../components';
import { Maybe } from '../../../types';
import { useNavigation } from '@react-navigation/native';
import { HomeStackScreenProps } from '../../../navigation';
import { partyAvailabilityLabels } from '../utils';
import { usePictureUpload } from '../../picture';
import Toast from 'react-native-toast-message';
import { GraphQLErrors } from '@apollo/client/errors';

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
  const { navigate } =
    useNavigation<HomeStackScreenProps<'PartyCreateForm'>['navigation']>();
  const [create, { loading: isLoading }] = usePartyCreateMutation();
  const { upload } = usePictureUpload();

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

  const availabilityOptions = useMemo(
    () =>
      Object.entries(partyAvailabilityLabels).map(([key, value]) => ({
        label: value,
        value: key,
      })),
    []
  );

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
        Toast.show({
          type: 'error',
          text1: 'Hubo un error al crear la fiesta.',
        });
        return;
      }

      await upload(res.data!.partyCreate, values.image);

      Toast.show({
        type: 'success',
        text1: 'Se mando la solicitud.',
      });

      navigate('Map');
    } catch (e) {
      const errors = e.graphQLErrors as GraphQLErrors;
      const error = errors[0];

      if (error && error.message === 'VALIDATION_ERROR') {
        setErrors(error.extensions);
        return;
      }

      Toast.show({
        type: 'error',
        text1: 'Hubo un error al crear la fiesta.',
      });

      console.log(e);
    }
  };

  const pickCoordinate = () => navigate('PartyCreateMap');

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, submitForm }) => (
        <>
          <Box flex flexGrow={1}>
            <FormikTextInput id="name" placeholder="Nombre" mt={1} />
            <Box flex row mt={1}>
              <FormikSelect
                id="availability"
                placeholder="Tipo"
                options={availabilityOptions}
              />
            </Box>
            <FormikTextInput
              id="address"
              placeholder="Direccion (Ej: 17 E/ 503 y 504 N2906)"
              mt={1}
            />
            <Box flex row mt={1}>
              <FormikSelect
                id="openBar"
                placeholder="Barra libre"
                options={[
                  { label: 'Si', value: 'yes' },
                  { label: 'No', value: 'no' },
                ]}
                mr={1}
              />
              <Box flexGrow={1}>
                <FormikDateInput id="date" placeholder="Fecha" />
              </Box>
            </Box>
            {values.availability !== PartyAvailability.Public && (
              <Box flex row mt={1}>
                <FormikSelect
                  id="allowInvites"
                  placeholder="Mis invitados pueden invitar"
                  options={[
                    { label: 'Si', value: 'yes' },
                    { label: 'No', value: 'no' },
                  ]}
                />
              </Box>
            )}
            <FormikTextInput
              id="description"
              placeholder="Descripcion"
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
            Continuar
          </Button>
        </>
      )}
    </Formik>
  );
};
